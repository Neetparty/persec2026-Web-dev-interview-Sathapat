# AI Prompt Log - Project Documentation and Interview Exercise Alignment

## Step / Prompt #1
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> [Pre-Interview Question Web Developer.pdf](resource/Pre-Interview%20Question%20Web%20Developer.pdf)
> Read file in resource, update all test-* to relate pre-interview question, write commit message and pr description using template what, how, why, impact
>
> @resource/Pre-Interview Question Web Developer.pdf

### AI Response
Read the supplied PDF and compared its six TypeScript exercises with the existing case implementations and API handlers. Updated Test-3 to rank prefix matches before interior matches and suffix matches, and fixed the request body handling for Tests 3–6 (including correcting the Test-4 route). Added a Test-3 regression case for the full PDF ranking example. Updated the README to describe the six PDF exercises and created `COMMIT_MESSAGE.md` and `PR_DESCRIPTION.md` using the requested What, How, Why, and Impact sections. The complete changed code is recorded in the relevant case logs: `src/test-3/prompts.md`, `src/test-4/prompts.md`, `src/test-5/prompts.md`, and `src/test-6/prompts.md`.

Commit message:

```text
Align interview exercises with PDF requirements
```

PR description:

```markdown
# What

Align the six interview exercise cases and their API endpoints with the supplied pre-interview question PDF.

# How

- Implement Test-3 prefix, interior, and suffix match ranking in the required order, preserving input order for ties.
- Fix Test-3 request parsing so all three autocomplete parameters come from the JSON body.
- Fix Test-4's route and request parsing so the Roman numeral and integer inputs are handled together as specified.
- Read Test-5's `num` value from its JSON body property.
- Read Test-6's initial terms and requested sequence length from the JSON body.
- Expand Test-3 coverage for the PDF's full ranking example and update the README with the source document and exercise summaries.

# Why

The existing exercises implement the six requested algorithms, but some endpoint handlers did not pass the documented inputs correctly, and autocomplete ranking did not fully follow the prefix/interior/suffix priority.

# Impact

The case endpoints now accept the request shapes described by the interview questions, and Test-3 returns suggestions using the requested ranking priority. Tests 1–2 and the core algorithms for Tests 4–6 remain scoped to their stated exercises.
```

## Step / Prompt #2
- **Model:** GPT-6
- **Reasoning:** Default

### User Prompt
> Next step, remove unused comments in test-* all file, update logic to match all pre-interview question and update test case to cover haapy case, failed case and edge case

### AI Response
Removed stale comments from all TypeScript files under `src/test-1/` through `src/test-6/`. Updated each service where required by the PDF or boundary behavior, and replaced each unit test file with success, rejection, and edge coverage. Test-3 now includes a suffix-ranking case; Test-4 rejects invalid Roman numerals and nonpositive integers; Test-5 rejects nonpositive and noninteger inputs; Test-6 validates seed count and requested length. Updated the README, commit message, and What / How / Why / Impact PR description. Full code for each changed case is logged in its case prompt file under `src/test-1/` through `src/test-6/`.

Commit message:

```text
Align all interview exercises and add edge-case coverage
```

PR description:

```markdown
# What

Align all six interview exercise implementations and tests with the supplied pre-interview question PDF.

# How

- Validate bracket-only input and balanced pairs in Test-1.
- Preserve natural, case-insensitive alphanumeric ordering in Test-2.
- Rank case-insensitive autocomplete matches by prefix, interior, then suffix in Test-3, and handle empty queries and nonpositive limits.
- Convert canonical positive Roman numerals in both directions and reject invalid values in Test-4.
- Sort digits in descending order for positive integers and reject invalid inputs in Test-5.
- Generate Tribonacci values from zero to three initial values, validate the requested total length, and handle truncation and missing seeds in Test-6.
- Add happy, failure, and edge coverage across the case specs, remove unused comments from the TypeScript case files, and correct the API request parsing and Swagger array schemas.

# Why

The exercise implementations and endpoints needed consistent behavior at the boundaries described by the PDF. Existing comments also included stale research and scaffold notes that no longer described the code.

# Impact

All six cases now have tests for their main behavior and relevant failure or boundary inputs. Cases 3–6 accept the documented JSON request bodies, Test-4 uses the correct route, and invalid values for the Roman numeral, positive integer, and Tribonacci requirements are rejected explicitly.
```
