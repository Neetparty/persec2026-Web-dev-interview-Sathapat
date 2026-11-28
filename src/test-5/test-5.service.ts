import { Injectable } from '@nestjs/common';

@Injectable()
export class Test5Service {
    test(num: number): { result: number } {
        if (!Number.isSafeInteger(num) || num <= 0) throw new RangeError('Input must be a positive safe integer.');

        const result = Number(String(num).split('').toSorted((left, right) => Number(right) - Number(left)).join(''));
        return { result };
    }
}
