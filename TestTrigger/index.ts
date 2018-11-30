import * as GitHub from 'github-api';

export async function run(context: any, req: any) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var gh = new GitHub({
        token: process.env['GithubAccessToken']
    });

    // note: make sure to use the following callback arguments otherwise everything is null
    const repo = gh.getRepo('kfcampbell', 'githubbot-serverless');

    repo.getSha('master', 'updates/daily_updates.txt', (error: any, result: any, request: any) => {
        context.log('got the sha!' + result);
        if (error) {
            context.log('error getting sha! ' + error);
            return;
        }

        repo.getBlob(result.sha, (error: any, result: any, request: any) => {
            context.log('found the blob!' + result);

            const newContents = `This page was last updated on: ${new Date().toUTCString()}`
            repo.writeFile('master', 'updates/daily_updates.txt', newContents, 'This is a commit message!', {
                encode: true
            }, (error: any, result: any, request: any) => {
                context.log('maybe we wrote a file???' + result);
            });
        });
    });


    context.res = {
        body: 'when i met your mom she told me i was handsome'
    };
};