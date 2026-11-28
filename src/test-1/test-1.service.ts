import { Injectable } from '@nestjs/common';
import { Test1Res } from './test-1.controller.js';

const matchingOpeners: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
const validBrackets = new Set(['(', ')', '[', ']', '{', '}']);

@Injectable()
export class Test1Service {
    test(input: string): Test1Res {
        const openers: string[] = [];

        for (const bracket of input) {
            if (!validBrackets.has(bracket)) return { result: false };
            if (!Object.hasOwn(matchingOpeners, bracket)) {
                openers.push(bracket);
                continue;
            }
            if (openers.pop() !== matchingOpeners[bracket]) return { result: false };
        }

        return { result: openers.length === 0 };
    }
}
