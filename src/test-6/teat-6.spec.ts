import { Test, TestingModule } from '@nestjs/testing';
import { Test6Service } from './test-6.service.js';

describe('Test 6 - Tribonacci sequence', () => {
    let service: Test6Service;
    const tribonacciCases: [number[], number, number[]][] = [
        [[1, 3, 5], 5, [1, 3, 5, 9, 17]],
        [[2, 2, 2], 3, [2, 2, 2]],
        [[10, 10, 10], 4, [10, 10, 10, 30]],
    ];
    const invalidCases: [number[], number][] = [[[1, 2, 3, 4], 5], [[1, 2, 3], -1], [[1, 2, 3], 1.5], [[1, 2.5], 4]];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test6Service] }).compile();
        service = module.get<Test6Service>(Test6Service);
    });

    it.each(tribonacciCases)('generates the requested total sequence length', (items, range, expected) => {
        expect(service.Tribonacci(items, range).result).toEqual(expected);
    });

    it.each(invalidCases)('rejects invalid seed counts or requested lengths: %s, %s', (items, range) => {
        expect(() => service.Tribonacci(items, range)).toThrow(RangeError);
    });

    it('returns an empty sequence when the requested length is zero', () => {
        expect(service.Tribonacci([], 0).result).toEqual([]);
    });

    it('pads missing initial values with zeroes before generating terms', () => {
        expect(service.Tribonacci([1], 3).result).toEqual([1, 1, 2]);
        expect(service.Tribonacci([], 5).result).toEqual([0, 0, 0, 0, 0]);
    });

    it('truncates initial values when the requested length is shorter', () => {
        expect(service.Tribonacci([10, 10, 10], 1).result).toEqual([10]);
    });
});
