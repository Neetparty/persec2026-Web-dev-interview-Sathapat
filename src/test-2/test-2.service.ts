import { Injectable } from '@nestjs/common';
import { Test2Res } from './test-2.controller.js';


@Injectable()
export class Test2Service {
    test(input: string[]): Test2Res {
        return {
            input,
            result: input.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        }
    }
}