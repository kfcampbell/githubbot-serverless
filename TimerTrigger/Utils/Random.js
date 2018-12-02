"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNumberOfCommits(max) {
    if (max < 1 || max > 20) {
        throw new Error(`Invalid max value of ${max}. Fix it, clown!`);
    }
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}
exports.getNumberOfCommits = getNumberOfCommits;
