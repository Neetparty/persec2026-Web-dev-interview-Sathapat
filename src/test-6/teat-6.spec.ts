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

    it.each([
        [[], 0, []],
        [[5, 2, 0], 3, [5, 2, 0]],
        [[1], 3, [1, 1, 2]],
        [[3, 4, 1], 4, [3, 4, 1, 8]],
        [[1, 3, 5], 5, [1, 3, 5, 9, 17]],
        [[2, 2, 2], 3, [2, 2, 2]],
        [[10, 10, 10], 4, [10, 10, 10, 30]],
        [[10, 10, 10], 1, [10]]
    ])('Test', (items, range, expected) => {
        const res = service.Tribonacci(items, range)
        expect(res.result).toEqual(expected)
    });
});
