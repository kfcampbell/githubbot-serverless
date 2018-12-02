import * as GitHub from 'github-api';
import { getRandomCommitMessage } from './Utils/CommitMessage';
import { getNumberOfCommits } from './Utils/Random';
import { sleep } from './Utils/Sleep';

module.exports = async function (context: any, myTimer: any) {

    const numberOfCommits = getNumberOfCommits(8);

    for (let i = 0; i < numberOfCommits; i++) {
        getRandomCommitMessage(function (err: any, res: any, body: string) {
            let commitMessage = 'Default commit message for automated updates.';
            if (err) {
                context.log('error getting message! ' + err);
                commitMessage = 'Error getting the real message!';
            }
            commitMessage = body;

            const gh = new GitHub({
                token: process.env['GithubAccessToken']
            });

            const repo = gh.getRepo('kfcampbell', 'githubbot-serverless');

            repo.getSha('master', 'updates/daily_updates.txt', (error: any, result: any, request: any) => {
                if (error) {
                    context.log('error getting sha! ' + error);
                    return;
                }

                repo.getBlob(result.sha, (error: any, result: any, request: any) => {
                    const newContents = `This file was last updated on: ${new Date().toUTCString()}`
                    repo.writeFile('master', 'updates/daily_updates.txt', newContents, commitMessage, {
                        encode: true
                    }, (error: any, result: any, request: any) => {
                        context.log('timer trigger writin files ' + result);
                    });
                });
            });
        });

        sleep(5);
    }

    if (myTimer.isPastDue) {
        context.log('JavaScript is running late!');
    }

    const timeStamp = new Date().toISOString();
    context.log('end of timer updating', timeStamp);
};