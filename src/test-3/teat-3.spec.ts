import { Test, TestingModule } from '@nestjs/testing';
import { Test3Service } from './test-3.service.js';

describe('Test 3', () => {
    let service: Test3Service

    beforeEach(async () => {
        vi.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Test3Service,
            ],
        }).compile();

        service = module.get<Test3Service>(Test3Service);
    })

    it.each([
        ['TH', ['SG20', 'TH2', 'TH19',], 2, ['TH2', 'TH19',]],
        ['th', ['Mother', 'Think', 'Worthy', 'Apple', 'Android'], 2, ['Think', 'Mother']]
    ])('Test', (search, items, maxResult, expected) => {
        const res = service.test(search, items, maxResult)
        expect(res.result).toEqual(expected);
    });

});
