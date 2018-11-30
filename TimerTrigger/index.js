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
module.exports = function (context, myTimer) {
    return __awaiter(this, void 0, void 0, function* () {
        var gh = new GitHub({
            token: process.env['GithubAccessToken']
        });
        const repo = gh.getRepo('kfcampbell', 'githubbot-serverless');
        repo.getSha('master', 'updates/daily_updates.txt', (error, result, request) => {
            if (error) {
                context.log('error getting sha! ' + error);
                return;
            }
            repo.getBlob(result.sha, (error, result, request) => {
                context.log('found the blob!' + result);
                const newContents = `This file was last updated on: ${new Date().toUTCString()}`;
                repo.writeFile('master', 'updates/daily_updates.txt', newContents, 'Automated update!', {
                    encode: true
                }, (error, result, request) => {
                    context.log('timer trigger writin files ' + result);
                });
            });
        });
        if (myTimer.isPastDue) {
            context.log('JavaScript is running late!');
        }
        const timeStamp = new Date().toISOString();
        context.log('end of timer updating', timeStamp);
    });
};
