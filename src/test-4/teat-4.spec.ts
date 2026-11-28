import { Test, TestingModule } from '@nestjs/testing';
import { Test4Service } from './test-4.service.js';

describe('Test 4 - Roman numeral conversions', () => {
    let service: Test4Service;
    const conversionCases: [number, string][] = [[1989, 'MCMLXXXIX'], [2000, 'MM'], [68, 'LXVIII'], [109, 'CIX']];
    const invalidNumbers: number[] = [0, -1, 1.5];
    const invalidNumerals: string[] = ['', 'IIII', 'IC', 'ABC'];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test4Service] }).compile();
        service = module.get<Test4Service>(Test4Service);
    });

    it.each(conversionCases)('converts integer %s to Roman numerals and back', (number, roman) => {
        expect(service.numberToRoman(number)).toBe(roman);
        expect(service.romanToNumber(roman)).toBe(number);
    });

    it.each(invalidNumbers)('rejects invalid integer inputs: %s', (number) => {
        expect(() => service.numberToRoman(number)).toThrow(RangeError);
    });

    it.each(invalidNumerals)('rejects invalid Roman numerals: %s', (roman) => {
        expect(() => service.romanToNumber(roman)).toThrow(RangeError);
    });

    it('converts the smallest supported value', () => {
        expect(service.numberToRoman(1)).toBe('I');
        expect(service.romanToNumber('I')).toBe(1);
    });
});
