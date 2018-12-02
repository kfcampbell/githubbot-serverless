import * as request from 'request';

export function getRandomCommitMessage(callback: (err: any, res: any, body: string) => any): void {
    request('http://whatthecommit.com/index.txt', { json: true }, callback);
}