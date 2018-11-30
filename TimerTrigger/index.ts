import * as GitHub from 'github-api';

module.exports = async function (context: any, myTimer: any) {

    var gh = new GitHub({
        token: process.env['GithubAccessToken']
    });

    const repo = gh.getRepo('kfcampbell', 'githubbot-serverless');

    repo.getSha('master', 'updates/daily_updates.txt', (error: any, result: any, request: any) => {
        if (error) {
            context.log('error getting sha! ' + error);
            return;
        }

        repo.getBlob(result.sha, (error: any, result: any, request: any) => {
            context.log('found the blob!' + result);

            const newContents = `This file was last updated on: ${new Date().toUTCString()}`
            repo.writeFile('master', 'updates/daily_updates.txt', newContents, 'Automated update!', {
                encode: true
            }, (error: any, result: any, request: any) => {
                context.log('timer trigger writin files ' + result);
            });
        });
    });

    if(myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }

    const timeStamp = new Date().toISOString();
    context.log('end of timer updating', timeStamp);   
};