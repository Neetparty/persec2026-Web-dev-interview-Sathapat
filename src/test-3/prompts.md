# AI Prompt Log - Test-3

## Step / Prompt #1
- **Model:** `GPT-6`
- **Reasoning:** `default`

### User Prompt
> # AGENTS.md instructions for this repository
>
> <INSTRUCTIONS>
> # AI Usage & Documentation Guidelines
>
> ## Mandatory Rules for AI-Assisted Coding
>
> Whenever you (the AI agent) generate, modify, or refactor code for any case/task in this repository, you **MUST** strictly follow these rules:
>
> ### 1. Prompt Log File (`prompts.md`)
> - **Location:** Create or update a file named `prompts.md` directly inside the **specific case directory** where the code changes were made (e.g., `case-01/prompts.md`).
> - **Scope:** Separate logs clearly by case/step. If a case is implemented 100% manually without AI assistance, do not create this file.
> - **Completeness:** Record **every** prompt submitted by the user and **every** corresponding response/output you generated in full. Do not summarize or omit exchanges.
>
> ### 2. Metadata Tracking per Entry
> For every single prompt-response interaction logged in `prompts.md`, you **MUST** explicitly record:
> - **Model:** The exact model name/ID used (e.g., `claude-sonnet-4-5`, `gpt-5-codex`, `gemini-2.5-pro`).
> - **Reasoning / Thinking Effort:** The reasoning mode, effort level, or thinking budget active for that turn (e.g., `high`, `medium`, `extended thinking enabled`, or `default` if not configurable).
>
> ### 3. Mandatory Line-by-Line Code Comments
> - Every single line of code written or modified by AI **MUST** include a clear inline or above-line comment explaining **what that line does and why**.
> - This applies to imports, type definitions, variable declarations, control flow, and return statements.
> - Never leave uncommented AI-generated lines.
>
> # Test-3
> Write auto-complete func get 3 parameter
> search: string using for search text in items
> items: string[] list items for search
> maxResult: number max response search items
>
> result search items with text by ignore case
>
> sample
> search: "th"
> items: [“Mother“, “Think”, “Worthy”, “Apple”, “Android”]
> maxResult: 2
>
> when search will get “Mother“, “Think”, “Worthy” and sort to “Think”, “Mother“, “Worthy” but maxResult is 2
>
> response will be [“Think”, “Mother“]
>
> scope in directory test-3 only
>
> @src/test-3/test-3.service.ts (line 21)

### AI Response
Updated `src/test-3/test-3.service.ts` within the requested Test-3 directory. Replaced the unused trie helpers with case-insensitive substring matching. Candidates are ranked by the index where the query first appears; ties retain their input order. The service limits results to a nonnegative integer `maxResult` and returns `{ result }`. For the supplied example, results are `Think`, then `Mother`. Each line of code written in the service has an inline comment describing its purpose. Added this prompt log in `src/test-3/prompts.md`.

```ts
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
```

---

## Step / Prompt #2
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Update test-3 prompts.md
>
> @src/test-3/prompts.md

### AI Response
Revised the existing Test-3 prompt log to use repository-relative paths and added the complete service code generated for the implementation step in a fenced TypeScript block. Preserved the initial user request and response in the log.

---
