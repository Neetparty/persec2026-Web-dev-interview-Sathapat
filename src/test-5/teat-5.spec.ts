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

    it.each([
        [3008, 8300],
        [1989, 9981],
        [2679, 9762],
        [9163, 9631]
    ])('Test', (num, expected) => {
        const res = service.test(num)
        expect(res.result).toEqual(expected)
    });
});
