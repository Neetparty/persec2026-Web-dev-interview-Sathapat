import { Test, TestingModule } from '@nestjs/testing';
import { Test1Service } from './test-1.service.js';

describe('Test 1 - balanced brackets', () => {
    let service: Test1Service;
    const balancedCases: [string, boolean][] = [['()', true], ['([{}])', true], ['()[]{}', true]];
    const unbalancedCases: [string, boolean][] = [['([]]', false], ['([[{}]]]', false], [')', false], ['([)]', false], ['{', false], ['(a)', false]];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test1Service] }).compile();
        service = module.get<Test1Service>(Test1Service);
    });

    it.each(balancedCases)('accepts balanced bracket strings: %s', (input, expected) => {
        expect(service.test(input).result).toBe(expected);
    });

    it.each(unbalancedCases)('rejects invalid bracket strings: %s', (input, expected) => {
        expect(service.test(input).result).toBe(expected);
    });

    it('treats an empty string as a balanced sequence', () => {
        expect(service.test('').result).toBe(true);
    });
});
