import { Injectable } from '@nestjs/common';

@Injectable()
export class Test6Service {
    Tribonacci(items: number[], range: number): { result: number[] } {
        if (!Number.isInteger(range) || range < 0) throw new RangeError('Requested length must be a nonnegative integer.');
        if (items.length > 3) throw new RangeError('Tribonacci accepts at most three initial values.');
        if (!items.every(Number.isSafeInteger)) throw new RangeError('Initial values must be safe integers.');

        if (range <= items.length) return { result: items.slice(0, range) };

        const missingSeeds = 3 - items.length;
        const sequence = [...Array(missingSeeds).fill(0), ...items];
        while (sequence.length < range + missingSeeds) {
            const length = sequence.length;
            sequence.push(sequence[length - 1] + sequence[length - 2] + sequence[length - 3]);
        }

        return { result: sequence.slice(missingSeeds) };
    }
}
