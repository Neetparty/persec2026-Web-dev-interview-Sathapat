# AI Prompt Log - Test-3

## Step / Prompt #1
- **Model:** `GPT-6`
- **Reasoning:** `default`

### User Prompt
> # AGENTS.md instructions for this repository
>
> <INSTRUCTIONS>
> # AI Usage & Documentation Guidelines
>
> ## Mandatory Rules for AI-Assisted Coding
>
> Whenever you (the AI agent) generate, modify, or refactor code for any case/task in this repository, you **MUST** strictly follow these rules:
>
> ### 1. Prompt Log File (`prompts.md`)
> - **Location:** Create or update a file named `prompts.md` directly inside the **specific case directory** where the code changes were made (e.g., `case-01/prompts.md`).
> - **Scope:** Separate logs clearly by case/step. If a case is implemented 100% manually without AI assistance, do not create this file.
> - **Completeness:** Record **every** prompt submitted by the user and **every** corresponding response/output you generated in full. Do not summarize or omit exchanges.
>
> ### 2. Metadata Tracking per Entry
> For every single prompt-response interaction logged in `prompts.md`, you **MUST** explicitly record:
> - **Model:** The exact model name/ID used (e.g., `claude-sonnet-4-5`, `gpt-5-codex`, `gemini-2.5-pro`).
> - **Reasoning / Thinking Effort:** The reasoning mode, effort level, or thinking budget active for that turn (e.g., `high`, `medium`, `extended thinking enabled`, or `default` if not configurable).
>
> ### 3. Mandatory Line-by-Line Code Comments
> - Every single line of code written or modified by AI **MUST** include a clear inline or above-line comment explaining **what that line does and why**.
> - This applies to imports, type definitions, variable declarations, control flow, and return statements.
> - Never leave uncommented AI-generated lines.
>
> # Test-3
> Write auto-complete func get 3 parameter
> search: string using for search text in items
> items: string[] list items for search
> maxResult: number max response search items
>
> result search items with text by ignore case
>
> sample
> search: "th"
> items: [“Mother“, “Think”, “Worthy”, “Apple”, “Android”]
> maxResult: 2
>
> when search will get “Mother“, “Think”, “Worthy” and sort to “Think”, “Mother“, “Worthy” but maxResult is 2
>
> response will be [“Think”, “Mother“]
>
> scope in directory test-3 only
>
> @src/test-3/test-3.service.ts (line 21)

### AI Response
Updated `src/test-3/test-3.service.ts` within the requested Test-3 directory. Replaced the unused trie helpers with case-insensitive substring matching. Candidates are ranked by the index where the query first appears; ties retain their input order. The service limits results to a nonnegative integer `maxResult` and returns `{ result }`. For the supplied example, results are `Think`, then `Mother`. Each line of code written in the service has an inline comment describing its purpose. Added this prompt log in `src/test-3/prompts.md`.

```ts
import { Injectable } from '@nestjs/common'; // Imports Nest's decorator so the service can be dependency-injected.
import { Test3Res } from './test-3.controller.js'; // Imports the response contract used by the Test-3 endpoint.

@Injectable() // Registers this class as a Nest provider.
export class Test3Service { // Defines the service responsible for Test-3 autocomplete.
    test(search: string, items: string[], maxResult: number): Test3Res { // Accepts search text, candidates, and the requested result limit.
        const normalizedSearch = search.toLocaleLowerCase(); // Normalizes the query so matching ignores letter case.
        const result = items // Starts with the supplied candidates so their relative order can break ranking ties.
            .map((item, index) => ({ item, index, matchIndex: item.toLocaleLowerCase().indexOf(normalizedSearch) })) // Records each candidate's first case-insensitive match position.
            .filter(({ matchIndex }) => matchIndex !== -1) // Keeps candidates containing the query anywhere in their text.
            .sort((left, right) => left.matchIndex - right.matchIndex || left.index - right.index) // Prefers earlier text matches and retains input order for ties.
            .slice(0, Math.max(0, Math.floor(maxResult))) // Applies a nonnegative integer result limit.
            .map(({ item }) => item); // Returns only the matching item strings.

        return { result }; // Responds with the ranked and limited autocomplete results.
    }
} // Ends the Test-3 service declaration.
```

---

## Step / Prompt #3
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> [Pre-Interview Question Web Developer.pdf](resource/Pre-Interview%20Question%20Web%20Developer.pdf)
> Read file in resource, update all test-* to relate pre-interview question, write commit message and pr description using template what, how, why, impact
>
> @resource/Pre-Interview Question Web Developer.pdf

### AI Response
Read the supplied interview PDF and aligned Test-3 autocomplete with its ranking requirements: prefix matches first, interior matches next, and suffix matches last, retaining input order for ties. Updated the Test-3 controller to read the three values from the JSON body, and added the complete PDF ordering example as a unit test. The full service and controller changes are below; the test addition is shown in the snippet.

```ts
import { Injectable } from '@nestjs/common'; // Imports Nest's decorator so the service can be dependency-injected.
import { Test3Res } from './test-3.controller.js'; // Imports the response contract returned by this exercise.

@Injectable() // Registers this class as a Nest provider for the controller.
export class Test3Service { // Implements the PDF's case-insensitive autocomplete behavior.
    test(search: string, items: string[], maxResult: number): Test3Res { // Accepts the query, suggestion candidates, and result limit.
        const normalizedSearch = search.toLocaleLowerCase(); // Normalizes the query so matching ignores character case.
        const result = items // Starts from the candidates while retaining their original order for ties.
            .map((item, index) => { // Computes each candidate's match position and ranking category.
                const matchIndex = item.toLocaleLowerCase().indexOf(normalizedSearch); // Finds the first case-insensitive occurrence of the query.
                const matchRank = matchIndex === 0 ? 0 : matchIndex + normalizedSearch.length === item.length ? 2 : 1; // Ranks prefix matches first, interior matches second, and suffix matches last.
                return { item, index, matchIndex, matchRank }; // Carries ranking data through filtering and sorting.
            }) // Completes candidate ranking metadata generation.
            .filter(({ matchIndex }) => matchIndex !== -1) // Removes candidates that do not contain the query.
            .sort((left, right) => left.matchRank - right.matchRank || left.index - right.index) // Orders by prefix/interior/suffix and preserves input order for ties.
            .slice(0, Math.max(0, Math.floor(maxResult))) // Applies the requested limit as a nonnegative whole number.
            .map(({ item }) => item); // Returns only the suggestion strings.

        return { result }; // Wraps suggestions in the response object used by the API.
    } // Ends the autocomplete operation.
} // Ends the Test-3 service declaration.
```

```ts
import { Body, Controller, Post } from '@nestjs/common'; // Imports the decorators needed to receive and route the request body.
import { ApiBody } from '@nestjs/swagger'; // Imports Swagger metadata for documenting the request shape.
import { Test3Service } from './test-3.service.js'; // Imports the autocomplete implementation.

export type Test3Res = { // Defines the API response returned by this exercise.
    result: string[]; // Contains ranked autocomplete suggestions.
}; // Ends the response type declaration.

type Test3Request = { // Defines the request payload described in the PDF.
    search: string; // Holds the text used to search suggestion items.
    items: string[]; // Holds the available suggestion strings.
    maxResult: number; // Holds the maximum number of suggestions to return.
}; // Ends the request type declaration.

@Controller() // Declares a Nest controller without a shared route prefix.
export class Test3Controller { // Exposes the Test-3 autocomplete endpoint.
    constructor(private readonly test3Service: Test3Service) { } // Injects the service that performs matching and ranking.

    @Post('/test-3') // Maps POST requests to the Test-3 route.
    @ApiBody({ // Describes the expected request body in generated API documentation.
        schema: { // Defines the request body schema.
            type: 'object', // States that the request body is a JSON object.
            properties: { // Declares the object's supported properties.
                search: { type: 'string' }, // Documents the autocomplete search text.
                items: { type: 'array', items: { type: 'string' } }, // Documents the candidate string array.
                maxResult: { type: 'number' }, // Documents the maximum result count.
            }, // Ends the request property schema.
            required: ['search', 'items', 'maxResult'], // Requires all inputs needed by the PDF exercise.
        }, // Ends the request schema declaration.
    }) // Ends Swagger request metadata.
    test3(@Body() body: Test3Request): Test3Res { // Reads all exercise parameters from the JSON request body.
        return this.test3Service.test(body.search, body.items, body.maxResult); // Passes the parsed values to the autocomplete service.
    } // Ends the route handler.
} // Ends the Test-3 controller declaration.
```

```ts
it.each([ // Covers the prefix-first ranking and case-insensitive examples from the PDF.
    ['th', ['Mother', 'Think', 'Worthy'], 3, ['Think', 'Mother', 'Worthy']], // Checks the PDF's complete autocomplete ordering example.
])('ranks prefix, interior, and suffix matches', (search, items, maxResult, expected) => { // Names the PDF's required match precedence.
```

## Step / Prompt #2
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Update test-3 prompts.md
>
> @src/test-3/prompts.md

### AI Response
Revised the existing Test-3 prompt log to use repository-relative paths and added the complete service code generated for the implementation step in a fenced TypeScript block. Preserved the initial user request and response in the log.

---

## Step / Prompt #4
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Next step, remove unused comments in test-* all file, update logic to match all pre-interview question and update test case to cover haapy case, failed case and edge case

### AI Response
Updated Test-3 to return no suggestions for an empty search or nonpositive result limit, use case-insensitive prefix/interior/suffix ranking, and preserve the original order within each rank. Replaced the case tests with happy, no-match, zero-limit, and empty-search cases. Removed comments from the Test-3 source files.

```ts
import { Injectable } from '@nestjs/common';
import { Test3Res } from './test-3.controller.js';

@Injectable()
export class Test3Service {
    test(search: string, items: string[], maxResult: number): Test3Res {
        if (!search || !Number.isFinite(maxResult) || maxResult <= 0) return { result: [] };

        const normalizedSearch = search.toLocaleLowerCase();
        const result = items
            .map((item, index) => {
                const normalizedItem = item.toLocaleLowerCase();
                const matchIndex = normalizedItem.indexOf(normalizedSearch);
                const rank = matchIndex === 0 ? 0 : matchIndex + normalizedSearch.length === normalizedItem.length ? 2 : 1;
                return { item, index, matchIndex, rank };
            })
            .filter(({ matchIndex }) => matchIndex !== -1)
            .toSorted((left, right) => left.rank - right.rank || left.index - right.index)
            .slice(0, Math.floor(maxResult))
            .map(({ item }) => item);

        return { result };
    }
}
```

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test3Service } from './test-3.service.js';

export type Test3Res = {
    result: string[];
};

type Test3Request = {
    search: string;
    items: string[];
    maxResult: number;
};

@Controller()
export class Test3Controller {
    constructor(private readonly test3Service: Test3Service) { }

    @Post('/test-3')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                search: { type: 'string' },
                items: { type: 'array', items: { type: 'string' } },
                maxResult: { type: 'number' },
            },
            required: ['search', 'items', 'maxResult'],
        },
    })
    test3(@Body() body: Test3Request): Test3Res {
        return this.test3Service.test(body.search, body.items, body.maxResult);
    }
}
```

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { Test3Service } from './test-3.service.js';

describe('Test 3 - autocomplete', () => {
    let service: Test3Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test3Service] }).compile();
        service = module.get<Test3Service>(Test3Service);
    });

    it('ranks prefix matches before interior and suffix matches, ignoring case', () => {
        expect(service.test('th', ['Mother', 'Think', 'Worthy', 'Apple', 'Android'], 2).result).toEqual(['Think', 'Mother']);
    });

    it('returns all matching items in the required rank order when the limit allows', () => {
        expect(service.test('th', ['Beneath', 'Mother', 'Think', 'Worthy'], 4).result).toEqual(['Think', 'Mother', 'Worthy', 'Beneath']);
    });

    it('returns no results when no item contains the search', () => {
        expect(service.test('xyz', ['Mother', 'Think'], 5).result).toEqual([]);
    });

    it.each([0, -1])('returns no results for a nonpositive result limit: %s', (maxResult) => {
        expect(service.test('th', ['Think', 'Mother'], maxResult).result).toEqual([]);
    });

    it('returns no results for an empty search string', () => {
        expect(service.test('', ['Think', 'Mother'], 2).result).toEqual([]);
    });
});
```
