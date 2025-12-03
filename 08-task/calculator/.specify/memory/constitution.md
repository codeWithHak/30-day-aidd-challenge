<!--
Sync Impact Report:
- Version change: (New) -> 1.0.0
- List of modified principles: Defined Principles I-IV (Precision First, TDD, Unix Philosophy, Explicit Errors).
- Added sections: Technology & Standards, Constraints & Success Criteria.
- Templates requiring updates: ✅ None (fresh setup).
- Follow-up TODOs: None.
-->
# Python CLI Calculator Constitution

## Core Principles

### I. Precision First
Use `decimal.Decimal` for all calculations to ensure exact results. There is zero tolerance for floating-point errors (e.g., `0.1 + 0.2` must equal `0.3`). Arithmetic correctness (including parentheses and order of operations) is paramount.

### II. Test-Driven Development (TDD)
Tests must be written before implementation (Red-Green-Refactor cycle is mandatory). We enforce `pytest` usage with a target of 80%+ code coverage. Verification is automated; logic is never manually tested as the primary gate.

### III. Unix Philosophy
The tool should do one thing well: calculate. It operates via text-based I/O only. It supports two modes:
1.  **Argument mode:** Single-shot execution (e.g., `calc 2 + 2`).
2.  **Interactive REPL mode:** For continuous sessions.
The application must be distinct from GUI libraries and follow standard streams (stdout for results, stderr for errors).

### IV. Explicit Errors
Provide clear, human-readable error messages for invalid input, division by zero, or overflow. The application must **never** crash or show raw stack traces to the user on invalid input or edge cases.

## Technology & Standards

*   **Language:** Python 3.12+ with comprehensive type hints (`mypy` strict mode).
*   **Testing:** `pytest` framework.
*   **CLI:** `argparse` for arguments, `cmd` module for the interactive REPL.
*   **Style:** PEP 8 compliant code.
*   **Architecture:** Modular structure required:
    *   `calculator_engine.py`: Pure business logic.
    *   `cli.py`: User interface and input handling.
    *   `main.py`: Entry point wiring them together.
*   **Dependencies:** Standard Library preferred; minimal external dependencies.

## Constraints & Success Criteria

### Constraints
*   **Platform:** Terminal only (no GUI). Cross-platform compatibility (Linux, Windows, macOS).
*   **Performance:** Instant startup (<100ms).
*   **Usability:** Runs directly via Python without complex environment setup.

### Success Criteria
*   Correct arithmetic operations respecting standard precedence rules (PEMDAS).
*   `--help` flag provides clear, helpful usage instructions.
*   Passes all precision checks (e.g., `0.1 + 0.2 == 0.3`).

## Governance

This constitution supersedes all other project practices.
*   **Amendments:** Require documentation, reasoning, and approval.
*   **Compliance:** All Pull Requests and reviews must verify compliance with these principles (especially TDD and Precision).
*   **Versioning:** Semantic versioning applies to this document and the software.

**Version**: 1.0.0 | **Ratified**: 2025-12-03 | **Last Amended**: 2025-12-03