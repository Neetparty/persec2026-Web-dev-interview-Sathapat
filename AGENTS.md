# AI Usage & Documentation Guidelines

## Mandatory Rules for AI-Assisted Coding

Whenever you (the AI agent) generate, modify, or refactor code for any case/task in this repository, you **MUST** strictly follow these rules:

### 1. Prompt Log File (`prompts.md`)
- **Location:** Create or update a file named `prompts.md` directly inside the **specific case directory** where the code changes were made (e.g., `src/test-3/prompts.md`).
- **Scope:** Separate logs clearly by case and step. If a case is implemented 100% manually without AI assistance, do not create this file.
- **Completeness:** Record **every** prompt submitted by the user and **every** corresponding response/output you generated in full (including the full code blocks written/modified). Do not summarize or omit exchanges.

### 2. Metadata & Path Sanitization
- **Metadata:** For every single prompt-response interaction logged in `prompts.md`, explicitly record:
  - **Model:** The exact model name/ID used (e.g., `GPT-6 luna`, `claude-sonnet-4-5`).
  - **Reasoning:** The reasoning level or thinking mode active for that turn (e.g., `Medium`, `High`, `Default`).
- **Path Sanitization:** Never include local machine absolute paths (such as `/Users/...` or `/Volumes/...`) in `prompts.md` or code comments. Strip them down to repository-relative paths only (e.g., `src/test-3/test-3.service.ts`).

### 3. Mandatory Line-by-Line Code Comments
- Every single line of code written or modified by AI **MUST** include a clear inline or above-line comment explaining **what that line does and why**.
- This applies to imports, type definitions, variable declarations, control flow, and return statements.
- Never leave uncommented AI-generated lines.

---

## Required Format for `<case-dir>/prompts.md`

Use the exact Markdown structure below when creating or appending to `prompts.md`.
**CRITICAL:** Do NOT copy instructional placeholder text (e.g., `<Exact prompt...>`) into `prompts.md`. Replace all placeholders with the actual content, and ensure no stray markdown fences remain.

```markdown
# AI Prompt Log - [Case Name / Number]

## Step / Prompt #1
- **Model:** [Actual Model Name]
- **Reasoning:** [Actual Reasoning Level]

### User Prompt
> [Exact user prompt verbatim, with local absolute paths converted to repo-relative paths]

### AI Response
[Full explanation of actions taken]

```ts
// [Full code generated or modified in this step, with line-by-line comments]