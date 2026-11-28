import { Injectable } from '@nestjs/common';

// Commit 1: Research using Google and using AI for create test-6 structure file
// Ref: https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1137.N-th%20Tribonacci%20Number/README_EN.md

@Injectable()
export class Test6Service {
    Tribonacci(items: number[], range: number): { result: number[] } {
        if (range <= items.length) return { result: items.slice(0, range) }

        let seed = 0
        if (items.length < 3) seed = 3 - items.length

        let newItems = [...new Array(seed).fill(0), ...items]

        while (newItems.length < range + seed) {
            const length = newItems.length
            const sum = newItems[length - 1] + newItems[length - 2] + newItems[length - 3]
            newItems.push(sum)
        }

        if (seed > 0) newItems = newItems.slice(seed)

        return { result: newItems }
    }
}
