"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const Sleep_1 = require("./Sleep");
describe('sleep', () => {
    it('should sleep the thread as expected', () => {
        const beforeTime = new Date().getTime();
        Sleep_1.sleep(1.5);
        const afterTime = new Date().getTime();
        const difference = afterTime - beforeTime;
        chai_1.expect(difference).to.be.greaterThan(1490);
        chai_1.expect(difference).to.be.lessThan(1510);
    });
});
