"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const Random_1 = require("./Random");
describe('getNumberOfCommits', () => {
    it('should return a random number', () => {
        const result = Random_1.getNumberOfCommits(8);
        chai_1.expect(result).to.be.lessThan(9);
        chai_1.expect(result).to.be.greaterThan(0);
    });
    it('should throw an error with a max value less than zero', () => {
        chai_1.expect(Random_1.getNumberOfCommits.bind(Random_1.getNumberOfCommits, -42)).to.throw();
    });
    it('should throw an error with a max value of zero', () => {
        chai_1.expect(Random_1.getNumberOfCommits.bind(Random_1.getNumberOfCommits, 0)).to.throw();
    });
    it('should throw an error with a max value of Number.MAX_SAFE_INTEGER', () => {
        chai_1.expect(Random_1.getNumberOfCommits.bind(Random_1.getNumberOfCommits, Number.MAX_SAFE_INTEGER)).to.throw();
    });
});
