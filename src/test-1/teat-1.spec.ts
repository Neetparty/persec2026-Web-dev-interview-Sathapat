import { Test, TestingModule } from '@nestjs/testing';
import { Test1Service } from './test-1.service.js';

describe('Test 1', () => {
    let service: Test1Service

    beforeEach(async () => {
        vi.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Test1Service,
            ],
        }).compile();

        service = module.get<Test1Service>(Test1Service);
    })

    it.each([
        ['()', true],
        ['([]]', false],
        ['([{}])', true],
        ['([[{}]]]', false],
        [')', false],
        ['(]}])', false],
        ['{', false],
        ['()[]{}', true],
        ['(]', false]
    ])('Test', (bracket, expected) => {
        const res = service.test(bracket)
        expect(res.result).toEqual(expected)
    });

});
