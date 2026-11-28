# Web Development Interview Exercises

This repository contains a NestJS and TypeScript API for a sequence of web development interview exercises. Each exercise lives in its own directory under `src/`, with a module, controller, service, and unit test.

## Exercises

| Case | Exercise |
| --- | --- |
| Test 1 | Validate whether a string of brackets is balanced. |
| Test 2 | Sort alphanumeric strings in natural, case-insensitive order. |
| Test 3 | Search items case-insensitively, rank matches, and limit the results. |
| Test 4 | Convert between Roman numerals and integers. |
| Test 5 | Rearrange a number's digits in descending order. |
| Test 6 | Generate a Tribonacci sequence from supplied seed values. |

The API modules are registered in `src/app.module.ts`. Each case's implementation and tests are in `src/test-N/`; AI-assisted work is recorded in the corresponding case's `prompts.md`. The repository-level `prompts.md` records project documentation requests.

### Research and using AI for help
Checkout branch: `main` or `feature/test-1`

### AI full loop
Checkout branch: `feature/test-using-full-ai-agent-loop`

## Requirements

- Node.js
- npm

## Install

```bash
npm install
```

## Run

```bash
# Start the API
npm run start

# Start with file watching
npm run start:dev
```

## Test

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

## Build and lint

```bash
npm run build
npm run lint
```
