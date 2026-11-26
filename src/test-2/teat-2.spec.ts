import { Test, TestingModule } from '@nestjs/testing';
import { Test2Service } from './test-2.service.js';

describe('Test 2', () => {
    let service: Test2Service

    beforeEach(async () => {
        vi.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Test2Service,
            ],
        }).compile();

        service = module.get<Test2Service>(Test2Service);
    })

    it.each([
        [['TH19', 'SG20', 'TH2'], ['SG20', 'TH2', 'TH19',]],
        [['TH10', 'TH3Netflix', 'TH1', 'TH7'], ['TH1', 'TH3Netflix', 'TH7', 'TH10']]
    ])('Test', (arr, expected) => {
        const res = service.test(arr)
        expect(res.input).toEqual(arr)
        expect(res.result).toEqual(expected);
    });

});
