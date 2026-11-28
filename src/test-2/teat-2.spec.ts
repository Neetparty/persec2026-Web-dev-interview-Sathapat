import { Test, TestingModule } from '@nestjs/testing';
import { Test2Service } from './test-2.service.js';

describe('Test 2 - natural alphanumeric sorting', () => {
    let service: Test2Service;
    const sortingCases: [string[], string[]][] = [
        [['TH19', 'SG20', 'TH2'], ['SG20', 'TH2', 'TH19']],
        [['TH10', 'TH3Netflix', 'TH1', 'TH7'], ['TH1', 'TH3Netflix', 'TH7', 'TH10']],
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [Test2Service] }).compile();
        service = module.get<Test2Service>(Test2Service);
    });

    it.each(sortingCases)('sorts the interview examples naturally', (input, expected) => {
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
