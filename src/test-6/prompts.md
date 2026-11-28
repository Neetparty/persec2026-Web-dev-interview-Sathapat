# AI Prompt Log - Test-6

## Step / Prompt #1
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Create test-6 file structure and don't comment in code

### AI Response
Created the Test-6 Nest module, controller, service, and unit test in `src/test-6/`, and registered `Test6Module` in `src/app.module.ts`. Since no Test-6 behavior was specified, the scaffold includes a temporary `GET /test-6` route and service response covered by its unit test. The generated code contains no comments.

```ts
// src/test-6/test-6.module.ts
import { Module } from '@nestjs/common';
import { Test6Controller } from './test-6.controller.js';
import { Test6Service } from './test-6.service.js';

@Module({
    imports: [],
    controllers: [Test6Controller],
    providers: [Test6Service],
})
export class Test6Module { }

// src/test-6/test-6.controller.ts
import { Controller, Get } from '@nestjs/common';
import { Test6Service } from './test-6.service.js';

@Controller()
export class Test6Controller {
    constructor(private readonly test6Service: Test6Service) { }

    @Get('/test-6')
    test6(): { message: string } {
        return this.test6Service.test();
    }
}

// src/test-6/test-6.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class Test6Service {
    test(): { message: string } {
        return { message: 'Test-6 scaffold' };
    }
}

// src/test-6/teat-6.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { Test6Service } from './test-6.service.js';

describe('Test 6', () => {
    let service: Test6Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Test6Service],
        }).compile();

        service = module.get<Test6Service>(Test6Service);
    });

    it('returns the scaffold response', () => {
        expect(service.test()).toEqual({ message: 'Test-6 scaffold' });
    });
});

// src/app.module.ts additions
import { Test6Module } from './test-6/test-6.module.js';
// Add Test6Module to the existing imports array.
```

## Step / Prompt #2
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> [Pre-Interview Question Web Developer.pdf](resource/Pre-Interview%20Question%20Web%20Developer.pdf)
> Read file in resource, update all test-* to relate pre-interview question, write commit message and pr description using template what, how, why, impact
>
> @resource/Pre-Interview Question Web Developer.pdf

### AI Response
Updated the Test-6 request schema to document the seed values as a number array and changed the handler to read `items` and `range` from the same JSON body, matching the PDF's inputs. The modified controller lines are shown below.

```ts
items: { type: 'array', items: { type: 'number' } }, // Documents the seed values as a JSON array of numbers.
test6(@Body() body: { items: number[]; range: number }): { result: number[] } { // Reads the initial terms and requested output length from the JSON body.
    return this.test6Service.Tribonacci(body.items, body.range); // Passes the seed array and total sequence length to the service.
```

## Step / Prompt #3
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Next step, remove unused comments in test-* all file, update logic to match all pre-interview question and update test case to cover haapy case, failed case and edge case

### AI Response
Updated Test-6 to validate nonnegative integer output lengths and seed arrays of at most three values, preserve supplied initial values, pad missing starting values with zeroes, and return exactly the requested total length. Added happy, invalid-input, empty-length, shorter-length, and missing-seed coverage. Removed comments from the Test-6 source files.

```ts
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
```

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test6Service } from './test-6.service.js';

@Controller()
export class Test6Controller {
    constructor(private readonly test6Service: Test6Service) { }

    @Post('/test-6')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                items: { type: 'array', items: { type: 'number' } },
                range: { type: 'number' },
            },
            required: ['items', 'range'],
        },
    })
    test6(@Body() body: { items: number[]; range: number }): { result: number[] } {
        return this.test6Service.Tribonacci(body.items, body.range);
    }
}
```

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { Test6Service } from './test-6.service.js';

describe('Test 6 - Tribonacci sequence', () => {
    let service: Test6Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test6Service] }).compile();
        service = module.get<Test6Service>(Test6Service);
    });

    it.each([
        [[1, 3, 5], 5, [1, 3, 5, 9, 17]],
        [[2, 2, 2], 3, [2, 2, 2]],
        [[10, 10, 10], 4, [10, 10, 10, 30]],
    ])('generates the requested total sequence length', (items, range, expected) => {
        expect(service.Tribonacci(items, range).result).toEqual(expected);
    });

    it.each([
        [[1, 2, 3, 4], 5],
        [[1, 2, 3], -1],
        [[1, 2, 3], 1.5],
        [[1, 2.5], 4],
    ])('rejects invalid seed counts or requested lengths: %s, %s', (items, range) => {
        expect(() => service.Tribonacci(items, range)).toThrow(RangeError);
    });

    it('returns an empty sequence when the requested length is zero', () => {
        expect(service.Tribonacci([], 0).result).toEqual([]);
    });

    it('pads missing initial values with zeroes before generating terms', () => {
        expect(service.Tribonacci([1], 3).result).toEqual([1, 1, 2]);
        expect(service.Tribonacci([], 5).result).toEqual([0, 0, 0, 0, 0]);
    });

    it('truncates initial values when the requested length is shorter', () => {
        expect(service.Tribonacci([10, 10, 10], 1).result).toEqual([10]);
    });
});
```
