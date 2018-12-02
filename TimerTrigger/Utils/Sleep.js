"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(secondsToSleep) {
    const timeToWaitTo = new Date().getTime() + (secondsToSleep * 1000);
    while (new Date().getTime() <= timeToWaitTo) { } // burn that thread baby
}
exports.sleep = sleep;
