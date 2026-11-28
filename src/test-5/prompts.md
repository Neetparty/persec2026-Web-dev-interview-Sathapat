# AI Prompt Log - Test-5

## Step / Prompt #1
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Create test-5 file structure and don't comment in code
>
> @src/test-4/teat-4.spec.ts

### AI Response
Created the Test-5 Nest module, controller, service, and unit test in `src/test-5/`, and registered `Test5Module` in `src/app.module.ts`. Since no Test-5 behavior was specified, the scaffold includes a temporary `GET /test-5` route and service response covered by the unit test. The generated code contains no comments.

```ts
// src/test-5/test-5.module.ts
import { Module } from '@nestjs/common';
import { Test5Controller } from './test-5.controller.js';
import { Test5Service } from './test-5.service.js';

@Module({
    imports: [],
    controllers: [Test5Controller],
    providers: [Test5Service],
})
export class Test5Module { }

// src/test-5/test-5.controller.ts
import { Controller, Get } from '@nestjs/common';
import { Test5Service } from './test-5.service.js';

@Controller()
export class Test5Controller {
    constructor(private readonly test5Service: Test5Service) { }

    @Get('/test-5')
    test5(): { message: string } {
        return this.test5Service.test();
    }
}

// src/test-5/test-5.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class Test5Service {
    test(): { message: string } {
        return { message: 'Test-5 scaffold' };
    }
}

// src/test-5/teat-5.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { Test5Service } from './test-5.service.js';

describe('Test 5', () => {
    let service: Test5Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Test5Service],
        }).compile();

        service = module.get<Test5Service>(Test5Service);
    });

    it('returns the scaffold response', () => {
        expect(service.test()).toEqual({ message: 'Test-5 scaffold' });
    });
});

// src/app.module.ts additions
import { Test5Module } from './test-5/test-5.module.js';
// Add Test5Module to the existing imports array.
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
Changed the Test-5 handler to read the `num` property from the request JSON, matching the positive integer input described in the PDF. The updated handler signature is shown below.

```ts
test5(@Body('num') num: number): { result: number } { // Extracts the positive integer field from the JSON request body.
```

## Step / Prompt #3
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Next step, remove unused comments in test-* all file, update logic to match all pre-interview question and update test case to cover haapy case, failed case and edge case

### AI Response
Updated Test-5 to accept only positive safe integers before sorting their digits in descending order. Replaced the tests with the PDF examples, invalid-number cases, one-digit input, and repeated digits with zeroes. Removed comments from the Test-5 source files.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class Test5Service {
    test(num: number): { result: number } {
        if (!Number.isSafeInteger(num) || num <= 0) throw new RangeError('Input must be a positive safe integer.');

        const result = Number(String(num).split('').toSorted((left, right) => Number(right) - Number(left)).join(''));
        return { result };
    }
}
```

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test5Service } from './test-5.service.js';

@Controller()
export class Test5Controller {
    constructor(private readonly test5Service: Test5Service) { }

    @Post('/test-5')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                num: { type: 'number' },
            },
            required: ['num'],
        },
    })
    test5(@Body('num') num: number): { result: number } {
        return this.test5Service.test(num);
    }
}
```

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { Test5Service } from './test-5.service.js';

describe('Test 5 - descending digit sort', () => {
    let service: Test5Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test5Service] }).compile();
        service = module.get<Test5Service>(Test5Service);
    });

    it.each([
        [3008, 8300],
        [1989, 9981],
        [2679, 9762],
        [9163, 9631],
    ])('sorts the digits in descending order for %s', (num, expected) => {
        expect(service.test(num).result).toBe(expected);
    });

    it.each([0, -1, 1.5])('rejects values that are not positive integers: %s', (num) => {
        expect(() => service.test(num)).toThrow(RangeError);
    });

    it('returns a one-digit positive integer unchanged', () => {
        expect(service.test(7).result).toBe(7);
    });

    it('keeps repeated digits and zeroes in the sorted result', () => {
        expect(service.test(1002).result).toBe(2100);
    });
});
```
