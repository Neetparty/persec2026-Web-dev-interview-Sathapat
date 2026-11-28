import { Injectable } from '@nestjs/common';
import { Test3Res } from './test-3.controller.js';

@Injectable()
export class Test3Service {
    test(search: string, items: string[], maxResult: number): Test3Res {
        if (!search || !Number.isFinite(maxResult) || maxResult <= 0) return { result: [] };

        const normalizedSearch = search.toLocaleLowerCase();
        const result = items
            .map((item, index) => {
                const normalizedItem = item.toLocaleLowerCase();
                const matchIndex = normalizedItem.indexOf(normalizedSearch);
                const rank = matchIndex === 0 ? 0 : matchIndex + normalizedSearch.length === normalizedItem.length ? 2 : 1;
                return { item, index, matchIndex, rank };
            })
            .filter(({ matchIndex }) => matchIndex !== -1)
            .toSorted((left, right) => left.rank - right.rank || left.index - right.index)
            .slice(0, Math.floor(maxResult))
            .map(({ item }) => item);

        return { result };
    }
}
