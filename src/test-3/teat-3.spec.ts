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
