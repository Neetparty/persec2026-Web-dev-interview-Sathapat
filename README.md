# Web Development Interview Exercises

This repository contains a NestJS and TypeScript API for six web development interview exercises. The requirements are transcribed from [`resource/Pre-Interview Question Web Developer.pdf`](resource/Pre-Interview%20Question%20Web%20Developer.pdf).

## Exercises

| Case | Exercise |
| --- | --- |
| Test 1 | Check whether a string of brackets is balanced. |
| Test 2 | Sort alphanumeric strings in natural, case-insensitive order. |
| Test 3 | Autocomplete case-insensitively, ranking prefix matches before interior and suffix matches, then apply the result limit. |
| Test 4 | Convert between Roman numerals and integers. |
| Test 5 | Rearrange a positive integer's digits in descending order. |
| Test 6 | Generate a Tribonacci sequence from zero to three initial values, returning the requested total sequence length. |

Each case is organized under `src/test-N/` with its Nest module, controller, service, and unit test. The modules are registered in `src/app.module.ts`. Prompt logs are kept in the case folders and at the project root.

The case tests cover the PDF examples as well as invalid inputs and boundary conditions, including empty inputs, result limits, positive integer constraints, and Tribonacci seed lengths.

## Requirements

- Node.js
- npm

## Install

```bash
# Installs the project's runtime and development dependencies.
npm install
```

## Run

```bash
# Starts the API once.
npm run start
# Starts the API with automatic reloads during development.
npm run start:dev
```

## Test

```bash
# Runs the unit test suite.
npm test
# Runs the end-to-end test suite.
npm run test:e2e
# Runs unit tests and reports coverage.
npm run test:cov
```

## Build and lint

```bash
# Compiles the NestJS application.
npm run build
# Checks the source and test files with the configured linter.
npm run lint
```
