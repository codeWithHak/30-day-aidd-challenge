# Implementation Plan: Python CLI Calculator

**Branch**: `001-cli-calculator` | **Date**: 2025-12-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-cli-calculator/spec.md`

## Summary

Implement a robust, precision-focused command-line calculator in Python. It will support two modes: a single-shot argument mode (Unix style) and an interactive REPL (using `cmd`). The core engine will use the Shunting-Yard algorithm to parse expressions and `decimal.Decimal` for all arithmetic to satisfy the "Precision First" constitutional requirement.

## Technical Context

**Language/Version**: Python 3.12+  
**Primary Dependencies**: Standard Library (`decimal`, `argparse`, `cmd`, `collections`). No 3rd party runtime deps.  
**Storage**: N/A (History in memory/readline).  
**Testing**: `pytest` (Development dependency).  
**Target Platform**: Cross-platform CLI (Linux/macOS/Windows).  
**Project Type**: Single Python Project (CLI tool).  
**Performance Goals**: Startup < 100ms.  
**Constraints**: No `eval()`, no floating point math, no GUI.  
**Scale/Scope**: Small, modular codebase (<1000 LOC).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*   **Precision First**: ✅ Addressed by using `decimal.Decimal` exclusively and custom parsing.
*   **TDD**: ✅ Plan includes writing tests first (Red-Green-Refactor).
*   **Unix Philosophy**: ✅ Supports text streams, argument mode, and stderr for errors.
*   **Explicit Errors**: ✅ Custom exceptions (InvalidExpressionError, etc.) mapped to human-readable stderr outputs.

## Project Structure

### Documentation (this feature)

```text
specs/001-cli-calculator/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
# Option 1: Single project
calculator/
├── __init__.py
├── main.py          # Entry point
├── cli.py           # REPL and Argument parsing
└── engine.py        # Tokenizer, Parser, Evaluator

tests/
├── __init__.py
├── test_engine.py   # Unit tests for logic
├── test_cli.py      # Integration tests for interface
└── conftest.py
```

**Structure Decision**: Modular separation of logic (`engine.py`) and interface (`cli.py`) as mandated by the Constitution.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
