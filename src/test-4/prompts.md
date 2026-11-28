# AI Prompt Log - Test-4

## Step / Prompt #1
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Create test-4 file structure

### AI Response
Created the Test-4 scaffold in `src/test-4/` with a Nest module, controller, service, and matching unit test. Registered `Test4Module` in `src/app.module.ts` so the route is available in the application. Since no Test-4 behavior was specified, the controller and service expose a temporary `GET /test-4` response and the unit test covers that placeholder. Added comments to every code line as required by the repository instructions.

```ts
// The Test-4 TypeScript files are documented inline in src/test-4/test-4.module.ts, src/test-4/test-4.controller.ts, src/test-4/test-4.service.ts, and src/test-4/teat-4.spec.ts.
// src/app.module.ts now imports and registers Test4Module.
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
Corrected the Test-4 route to `/test-4` and changed the handler to read the Roman numeral and integer from one typed JSON request body, matching the PDF's paired conversion inputs. The complete updated controller is recorded below.

```ts
import { Body, Controller, Post } from '@nestjs/common'; // Imports Nest decorators for parsing and routing the request.
import { ApiBody } from '@nestjs/swagger'; // Imports Swagger metadata for the request schema.
import { Test4Service } from './test-4.service.js'; // Imports the Roman numeral conversion service.

export type Test4Res = { // Defines the response containing both conversion directions.
    roman: string; // Contains the Roman numeral converted from the input number.
    number: number; // Contains the integer converted from the input Roman numeral.
}; // Ends the response type declaration.

type Test4Request = { // Defines the two inputs required by the PDF exercise.
    roman: string; // Holds a Roman numeral to convert to an integer.
    number: number; // Holds an integer to convert to a Roman numeral.
}; // Ends the request type declaration.

@Controller() // Declares a Nest controller without a shared route prefix.
export class Test4Controller { // Exposes both Test-4 conversion operations.
    constructor(private readonly test4Service: Test4Service) { } // Injects the service that performs the conversions.

    @Post('/test-4') // Maps POST requests to the correct Test-4 route.
    @ApiBody({ // Describes the expected JSON body in API documentation.
        schema: { // Defines the request body schema.
            type: 'object', // States that the request body is a JSON object.
            properties: { // Declares the supported request fields.
                roman: { type: 'string' }, // Documents the Roman numeral input.
                number: { type: 'number' }, // Documents the integer input.
            }, // Ends the request property schema.
            required: ['roman', 'number'], // Requires both inputs for the paired conversion response.
        }, // Ends the request schema declaration.
    }) // Ends Swagger request metadata.
    test4(@Body() body: Test4Request): Test4Res { // Reads both values from the JSON request body.
        return { // Builds the response with both conversion results.
            roman: this.test4Service.numberToRoman(body.number), // Converts the supplied integer into a Roman numeral.
            number: this.test4Service.romanToNumber(body.roman), // Converts the supplied Roman numeral into an integer.
        }; // Ends the response object.
    } // Ends the route handler.
} // Ends the Test-4 controller declaration.
```

## Step / Prompt #3
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Next step, remove unused comments in test-* all file, update logic to match all pre-interview question and update test case to cover haapy case, failed case and edge case

### AI Response
Reworked Roman numeral parsing to accept only canonical positive numerals, and integer conversion to reject zero, negative, fractional, and unsafe values. Replaced the Test-4 unit tests with the PDF's round-trip examples plus invalid numeral, invalid integer, and smallest-value cases. Removed comments from the Test-4 TypeScript files.

```ts
import { Injectable } from '@nestjs/common';

const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
];

@Injectable()
export class Test4Service {
    romanToNumber(roman: string): number {
        if (!roman) throw new RangeError('Roman numeral must not be empty.');

        let remaining = roman;
        let number = 0;

        for (const { symbol, value } of romanNumerals) {
            while (remaining.startsWith(symbol)) {
                number += value;
                remaining = remaining.slice(symbol.length);
            }
        }

        if (remaining || this.numberToRoman(number) !== roman) throw new RangeError('Invalid Roman numeral.');
        return number;
    }

    numberToRoman(number: number): string {
        if (!Number.isSafeInteger(number) || number <= 0) throw new RangeError('Number must be a positive safe integer.');

        let remaining = number;
        let roman = '';

        for (const { symbol, value } of romanNumerals) {
            while (remaining >= value) {
                roman += symbol;
                remaining -= value;
            }
        }

        return roman;
    }
}
```

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test4Service } from './test-4.service.js';

export type Test4Res = {
    roman: string;
    number: number;
};

type Test4Request = {
    roman: string;
    number: number;
};

@Controller()
export class Test4Controller {
    constructor(private readonly test4Service: Test4Service) { }

    @Post('/test-4')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                roman: { type: 'string' },
                number: { type: 'number' },
            },
            required: ['roman', 'number'],
        },
    })
    test4(@Body() body: Test4Request): Test4Res {
        return {
            roman: this.test4Service.numberToRoman(body.number),
            number: this.test4Service.romanToNumber(body.roman),
        };
    }
}
```

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { Test4Service } from './test-4.service.js';

describe('Test 4 - Roman numeral conversions', () => {
    let service: Test4Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test4Service] }).compile();
        service = module.get<Test4Service>(Test4Service);
    });

    it.each([
        [1989, 'MCMLXXXIX'],
        [2000, 'MM'],
        [68, 'LXVIII'],
        [109, 'CIX'],
    ])('converts integer %s to Roman numerals and back', (number, roman) => {
        expect(service.numberToRoman(number)).toBe(roman);
        expect(service.romanToNumber(roman)).toBe(number);
    });

    it.each([0, -1, 1.5])('rejects invalid integer inputs: %s', (number) => {
        expect(() => service.numberToRoman(number)).toThrow(RangeError);
    });

    it.each(['', 'IIII', 'IC', 'ABC'])('rejects invalid Roman numerals: %s', (roman) => {
        expect(() => service.romanToNumber(roman)).toThrow(RangeError);
    });

    it('converts the smallest supported value', () => {
        expect(service.numberToRoman(1)).toBe('I');
        expect(service.romanToNumber('I')).toBe(1);
    });
});
```
