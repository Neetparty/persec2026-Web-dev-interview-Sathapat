import { Injectable } from '@nestjs/common';
import { Test1Res } from './test-1.controller.js';

// Commit 1: Without Research
// Commit 2: Research using Google 
const brackets = { ')': '(', '}': '{', ']': '[' }

@Injectable()
export class Test1Service {
    test(input: string): Test1Res {
        const newArr = []
        if (input.length % 2 === 1) {
            return {
                result: false
            }
        }

        for (const c of input.split('')) {
            if (!(c in brackets)) {
                newArr.push(c);
            } else if (newArr.length === 0 || newArr.pop() !== brackets[c as keyof typeof brackets]) {
                return {
                    result: false
                }
            }
        }

        return {
            result: newArr.length === 0
        }
    }
}