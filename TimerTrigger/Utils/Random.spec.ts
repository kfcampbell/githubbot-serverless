import { expect } from 'chai';
import 'mocha';
import { getNumberOfCommits } from './Random';

describe('getNumberOfCommits', () => {
    it('should return a random number', () => {
        const result = getNumberOfCommits(8);
        expect(result).to.be.lessThan(9);
        expect(result).to.be.greaterThan(0);
    });

    it('should throw an error with a max value less than zero', () => {
        expect(getNumberOfCommits.bind(getNumberOfCommits, -42)).to.throw();
    });

    it('should throw an error with a max value of zero', () => {
        expect(getNumberOfCommits.bind(getNumberOfCommits, 0)).to.throw();
    });

    it('should throw an error with a max value of Number.MAX_SAFE_INTEGER', () => {
        expect(getNumberOfCommits.bind(getNumberOfCommits, Number.MAX_SAFE_INTEGER)).to.throw();
    });
});