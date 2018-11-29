import * as GitHub from 'github-api';

export async function run(context: any, req: any) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var gh = new GitHub({
        token: process.env['GithubAccessToken']
    });

    // note: make sure to use the following callback arguments otherwise everything is null
    const repo = gh.getRepo('kfcampbell', 'GithubBotRepo');
    const commit = repo.getCommit('4663022e221663471d9466a618f6401912088692', (error: any, result: any, request: any) => {
        context.log('got a commit maybe? ' + result);
    });

    // todo: figure out how to get the content of a specific file
    // ideas: get sha and then get blob. something might have to be base64 encoded or decoded

    context.res = {
        body: 'when i met your mom she told me i was handsome'
    };
};