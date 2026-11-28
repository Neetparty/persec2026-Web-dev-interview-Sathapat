import { Test, TestingModule } from '@nestjs/testing';
import { Test5Service } from './test-5.service.js';

describe('Test 5 - descending digit sort', () => {
    let service: Test5Service;
    const digitCases: [number, number][] = [[3008, 8300], [1989, 9981], [2679, 9762], [9163, 9631]];
    const invalidNumbers: number[] = [0, -1, 1.5];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test5Service] }).compile();
        service = module.get<Test5Service>(Test5Service);
    });

    it.each(digitCases)('sorts the digits in descending order for %s', (num, expected) => {
        expect(service.test(num).result).toBe(expected);
    });

    it.each(invalidNumbers)('rejects values that are not positive integers: %s', (num) => {
        expect(() => service.test(num)).toThrow(RangeError);
    });

    it('returns a one-digit positive integer unchanged', () => {
        expect(service.test(7).result).toBe(7);
    });

    it('keeps repeated digits and zeroes in the sorted result', () => {
        expect(service.test(1002).result).toBe(2100);
    });
});
