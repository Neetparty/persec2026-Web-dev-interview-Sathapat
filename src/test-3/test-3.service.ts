import { Injectable } from '@nestjs/common'; // Imports Nest's decorator so the service can be dependency-injected.
import { Test3Res } from './test-3.controller.js'; // Imports the response contract used by the Test-3 endpoint.

@Injectable() // Registers this class as a Nest provider.
export class Test3Service { // Defines the service responsible for Test-3 autocomplete.
    test(search: string, items: string[], maxResult: number): Test3Res { // Accepts search text, candidates, and the requested result limit.
        const normalizedSearch = search.toLocaleLowerCase(); // Normalizes the query so matching ignores letter case.
        const result = items // Starts with the supplied candidates so their relative order can break ranking ties.
            .map((item, index) => ({ item, index, matchIndex: item.toLocaleLowerCase().indexOf(normalizedSearch) })) // Records each candidate's first case-insensitive match position.
            .filter(({ matchIndex }) => matchIndex !== -1) // Keeps candidates containing the query anywhere in their text.
            .sort((left, right) => left.matchIndex - right.matchIndex || left.index - right.index) // Prefers earlier text matches and retains input order for ties.
            .slice(0, Math.max(0, Math.floor(maxResult))) // Applies a nonnegative integer result limit.
            .map(({ item }) => item); // Returns only the matching item strings.

        return { result }; // Responds with the ranked and limited autocomplete results.
    }
} // Ends the Test-3 service declaration.
