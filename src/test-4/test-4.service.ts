import { Injectable } from '@nestjs/common'; // Imports Nest's decorator so this service can be injected.

// Commit 1: Research using Google and using AI for create test-4 structure file
// Ref: https://medium.com/@AlexanderObregon/solving-the-roman-to-integer-problem-on-leetcode-typescript-solutions-walkthrough-7bb0586ab9f8
// Ref: https://dev.to/rahulgithubweb/leetcode-challenge-12-integer-to-roman-javascript-solution-1ee

const romanMap = [
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
        let sum = 0
        let prevValue = 0

        for (const val of roman.split("")) {
            const currentValue = romanMap.find(({ symbol }) => symbol === val)?.value || 0
            sum += currentValue > prevValue ? currentValue - 2 * prevValue : currentValue
            prevValue = currentValue;
        }
        return sum


    }

    numberToRoman = (num: number): string => {
        let result = ''

        for (const { symbol, value } of romanMap) {
            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }

        return result
    }
}
