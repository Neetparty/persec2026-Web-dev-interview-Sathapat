import { Test, TestingModule } from '@nestjs/testing'; // Imports Nest's testing utilities for creating a service test module.
import { Test4Service } from './test-4.service.js'; // Imports the service being tested.

describe('Test 4', () => {
    let service: Test4Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Test4Service],
        }).compile();

        service = module.get<Test4Service>(Test4Service);
    });

    const caseList: [number, string][] = [
        [1989, "MCMLXXXIX"],
        [2000, "MM"],
        [68, "LXVIII"],
        [109, "CIX"]
    ]

    it.each(caseList)('Test Number -> Roman', (num, expected) => {
        const res = service.numberToRoman(num)
        expect(res).toEqual(expected);
    });

    it.each(caseList)('Test Roman -> Number', (expected, roman) => {
        const res = service.romanToNumber(roman)
        expect(res).toEqual(expected);
    });
}); 
