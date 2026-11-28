import { Injectable } from '@nestjs/common';
import { Test2Res } from './test-2.controller.js';

@Injectable()
export class Test2Service {
    test(input: string[]): Test2Res {
        return {
            input,
            result: input.toSorted((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' })),
        };
    }
}
