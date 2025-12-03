# ADR-0001: Core Computation Strategy

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-12-03
- **Feature:** Python CLI Calculator
- **Context:** The calculator requires high precision for decimal arithmetic (e.g., `0.1 + 0.2 == 0.3`), which standard floating-point math cannot guarantee. It also requires safe evaluation of mathematical expressions from user input without the security risks of `eval()`.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

We will use the **Shunting-Yard Algorithm** for parsing expressions combined with Python's `decimal.Decimal` type for all numeric representation and arithmetic.

- **Algorithm:** Shunting-Yard (to convert infix to Reverse Polish Notation).
- **Data Type:** `decimal.Decimal` with a default precision of 28 places.
- **Validation:** Custom tokenization to reject invalid characters before parsing.

## Consequences

### Positive

- **Precision:** Guarantees exact results for decimal operations, satisfying the core "Precision First" principle.
- **Safety:** Eliminates arbitrary code execution risks associated with `eval()`.
- **Control:** Allows fine-grained control over operator precedence and error reporting (e.g., DivisionByZero).

### Negative

- **Performance:** Slower than native floating-point arithmetic (though negligible for a CLI calculator).
- **Complexity:** Requires implementing a custom parser and evaluator rather than using built-in language features.

## Alternatives Considered

### Alternative 1: `eval()` with globals restricted
- **Why rejected:** Still carries security risks; hard to enforce `Decimal` type for all literals automatically; prone to "floating point" issues if not careful.

### Alternative 2: `ast.literal_eval`
- **Why rejected:** Does not support mathematical operators (`+`, `-`, etc.), only data structures.

### Alternative 3: Standard `float`
- **Why rejected:** Fails the `0.1 + 0.2 == 0.3` test; violates the "Precision First" constitutional principle.

## References

- Feature Spec: specs/001-cli-calculator/spec.md
- Implementation Plan: specs/001-cli-calculator/plan.md
- Research: specs/001-cli-calculator/research.md
