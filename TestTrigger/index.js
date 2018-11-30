"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GitHub = require("github-api");
function run(context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('JavaScript HTTP trigger function processed a request.');
        var gh = new GitHub({
            token: process.env['GithubAccessToken']
        });
        // note: make sure to use the following callback arguments otherwise everything is null
        const repo = gh.getRepo('kfcampbell', 'githubbot-serverless');
        repo.getSha('master', 'updates/daily_updates.txt', (error, result, request) => {
            context.log('got the sha!' + result);
            if (error) {
                context.log('error getting sha! ' + error);
                return;
            }
            repo.getBlob(result.sha, (error, result, request) => {
                context.log('found the blob!' + result);
                const newContents = `This page was last updated on: ${new Date().toUTCString()}`;
                repo.writeFile('master', 'updates/daily_updates.txt', newContents, 'This is a commit message!', {
                    encode: true
                }, (error, result, request) => {
                    context.log('maybe we wrote a file???' + result);
                });
            });
        });
        context.res = {
            body: 'when i met your mom she told me i was handsome'
        };
    });
}
exports.run = run;
;
