import { Injectable } from '@nestjs/common';

const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
];

@Injectable()
export class Test4Service {
    romanToNumber(roman: string): number {
        if (!roman) throw new RangeError('Roman numeral must not be empty.');

        let remaining = roman;
        let number = 0;

        for (const { symbol, value } of romanNumerals) {
            while (remaining.startsWith(symbol)) {
                number += value;
                remaining = remaining.slice(symbol.length);
            }
        }

        if (remaining || this.numberToRoman(number) !== roman) throw new RangeError('Invalid Roman numeral.');
        return number;
    }

    numberToRoman(number: number): string {
        if (!Number.isSafeInteger(number) || number <= 0) throw new RangeError('Number must be a positive safe integer.');

        let remaining = number;
        let roman = '';

        for (const { symbol, value } of romanNumerals) {
            while (remaining >= value) {
                roman += symbol;
                remaining -= value;
            }
        }

        return roman;
    }
}
