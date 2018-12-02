export function getNumberOfCommits(max: number): number {
    if(max < 1 || max > 20) {
        throw new Error(`Invalid max value of ${max}. Fix it, clown!`);
    }
    return Math.floor(Math.random() * Math.floor(max)) + 1;
} 