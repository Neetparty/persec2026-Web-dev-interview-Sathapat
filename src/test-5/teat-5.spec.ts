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

    it('returns the scaffold response', () => {
        expect(service.test()).toEqual({ message: 'Test-5 scaffold' });
    });
});
