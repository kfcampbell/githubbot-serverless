export function sleep(secondsToSleep: number) {
    const timeToWaitTo = new Date().getTime() + (secondsToSleep * 1000);
    while (new Date().getTime() <= timeToWaitTo) { } // burn that thread baby
}