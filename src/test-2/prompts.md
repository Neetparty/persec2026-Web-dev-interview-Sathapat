# AI Prompt Log - Test-2

## Step / Prompt #1
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Next step, remove unused comments in test-* all file, update logic to match all pre-interview question and update test case to cover haapy case, failed case and edge case

### AI Response
Confirmed and retained natural, case-insensitive alphanumeric sorting with `toSorted`, so the original input remains unchanged. Replaced Test-2 tests with PDF examples, empty-input behavior, input immutability, and a negative assertion against lexical ordering. Removed comments from the code under `src/test-2/`.

```ts
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
```

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { Test2Service } from './test-2.service.js';

describe('Test 2 - natural alphanumeric sorting', () => {
    let service: Test2Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test2Service] }).compile();
        service = module.get<Test2Service>(Test2Service);
    });

    it.each([
        [['TH19', 'SG20', 'TH2'], ['SG20', 'TH2', 'TH19']],
        [['TH10', 'TH3Netflix', 'TH1', 'TH7'], ['TH1', 'TH3Netflix', 'TH7', 'TH10']],
    ])('sorts the interview examples naturally', (input, expected) => {
        expect(service.test(input).result).toEqual(expected);
    });

    it('returns an empty array for empty input', () => {
        expect(service.test([]).result).toEqual([]);
    });

    it('does not leave numeric suffixes in lexical order', () => {
        expect(service.test(['TH19', 'TH2']).result).not.toEqual(['TH19', 'TH2']);
    });

    it('keeps the original input array unchanged', () => {
        const input = ['TH10', 'TH2'];
        const copy = [...input];

        expect(service.test(input).result).toEqual(['TH2', 'TH10']);
        expect(input).toEqual(copy);
    });
});
```
