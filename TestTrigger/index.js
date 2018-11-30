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
        const repo = gh.getRepo('kfcampbell', 'GithubBotRepo');
        const commit = repo.getCommit('4663022e221663471d9466a618f6401912088692', (error, result, request) => {
            context.log('got a commit maybe? ' + result);
        });
        // todo: figure out how to get the content of a specific file
        // ideas: get sha and then get blob. something might have to be base64 encoded or decoded
        // note: need to create directory in repo to actually house the files.
        // have to remember to ignore when deploying to function.
        const sha = repo.getSha('updates/daily_updates.txt', (error, result, request) => {
            context.log('got the sha!' + result);
        });
        context.res = {
            body: 'when i met your mom she told me i was handsome'
        };
    });
}
exports.run = run;
;
