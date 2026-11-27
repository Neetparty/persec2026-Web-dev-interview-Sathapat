import { Injectable } from '@nestjs/common';
import { Test2Res } from './test-2.controller.js';

// Commit 1: Research using Google 
// Ref: https://stackoverflow.com/questions/2802341/natural-sort-of-alphanumerical-strings-in-javascript

@Injectable()
export class Test2Service {
    test(input: string[]): Test2Res {
        return {
            input,
            // Sonarqube extension on VSCode recommended to use toSorted()
            // Move this array "sort" operation to a separate statement or replace it with "toSorted".sonarqube(typescript:S4043)
            result: input.toSorted((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        }
    }
}