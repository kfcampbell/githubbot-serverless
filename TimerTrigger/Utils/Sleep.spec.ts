import { expect } from 'chai';
import 'mocha';
import { getNumberOfCommits } from './Random';
import { sleep } from './Sleep';

describe('sleep', () => {
    it('should sleep the thread as expected', () => {
        const beforeTime = new Date().getTime();
        sleep(1.5);
        const afterTime = new Date().getTime();
        const difference = afterTime - beforeTime;
        expect(difference).to.be.greaterThan(1490);
        expect(difference).to.be.lessThan(1510);
    });
});