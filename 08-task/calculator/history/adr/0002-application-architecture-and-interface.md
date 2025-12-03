# ADR-0002: Application Architecture and Interface

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-12-03
- **Feature:** Python CLI Calculator
- **Context:** The application needs to support two distinct usage modes: a Unix-style one-shot command (e.g., `calc 2+2`) and an interactive shell (REPL) with history. The codebase must also be modular to separate business logic from user interface concerns.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

We will implement a **Modular Hybrid Architecture** utilizing the standard library's `cmd` module.

- **Structure:** Separation of concerns into `calculator_engine.py` (logic), `cli.py` (interface), and `main.py` (entry point).
- **Hybrid Mode:** `main.py` detects `sys.argv` length to switch between single execution and `cmd.Cmd` REPL loop.
- **Dependencies:** Zero external runtime dependencies (Standard Library only).

## Consequences

### Positive

- **Modularity:** The engine can be tested in isolation or reused in other interfaces (e.g., a future GUI).
- **UX:** Provides a robust REPL with built-in history and help commands via `cmd` module without extra coding.
- **Portability:** Zero dependencies ensures the tool runs anywhere Python is installed without `pip install`.

### Negative

- **Boilerplate:** Requires more file overhead than a single-script solution.
- **Legacy UI:** The `cmd` module is older and lacks modern features like syntax highlighting or auto-completion found in libraries like `prompt_toolkit` (though this aligns with the "Standard Library preferred" constraint).

## Alternatives Considered

### Alternative 1: Single Script / Monolithic
- **Why rejected:** Violates the "Modular structure" requirement; hard to test logic without side effects.

### Alternative 2: `input()` loop
- **Why rejected:** Lacks command history and standard REPL features; poor user experience.

### Alternative 3: External Libraries (`click`, `typer`, `prompt_toolkit`)
- **Why rejected:** Violates the "Standard Library preferred" constraint; adds installation friction.

## References

- Feature Spec: specs/001-cli-calculator/spec.md
- Implementation Plan: specs/001-cli-calculator/plan.md
- Research: specs/001-cli-calculator/research.md
