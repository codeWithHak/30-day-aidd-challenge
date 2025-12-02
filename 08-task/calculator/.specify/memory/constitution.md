<!--
Sync Impact Report:
- Version change: None -> 1.0.0 (Initial Constitution)
- Added sections: Precision First, Test-Driven Development, Unix Philosophy, Explicit Errors
- Templates requiring updates: None (Validated against templates)
-->
# Python CLI Calculator Constitution

## Core Principles

### I. Precision First
Calculations must use the `Decimal` type for all arithmetic operations to ensure exactness. Floating-point arithmetic (binary approximation) is strictly prohibited for calculation logic to avoid errors like `0.1 + 0.2 != 0.3`.

### II. Test-Driven Development (NON-NEGOTIABLE)
All code changes must follow the Red-Green-Refactor cycle. Tests must be written and fail before implementation begins. A minimum of 80% test coverage via `pytest` is required.

### III. Unix Philosophy
The application must adhere to the "Do One Thing Well" philosophy. It relies on text-based I/O (stdin/stdout/stderr), ensuring composability with other terminal tools. It operates strictly in the terminal without GUI dependencies.

### IV. Explicit Errors
The system must never crash silently or with opaque stack traces. Invalid inputs, division by zero, and overflow conditions must produce clear, human-readable error messages to stderr, while maintaining a non-zero exit code.

## Standards & Constraints

### Technology Stack
- **Language**: Python 3.12+
- **Typing**: Strict static typing with `mypy` required.
- **Testing**: `pytest` framework.
- **Structure**: Modular design separating logic (`calculator_engine.py`), UI (`cli.py`), and entry point (`main.py`).

### Performance & Environment
- **Startup**: Must execute in <100ms.
- **Compatibility**: Cross-platform support (Linux, Windows, macOS).
- **Dependencies**: Standard Library preferred to minimize bloat.

## Governance

### Amendment Process
Amendments to this constitution require a documented reason and version bump. Breaking changes to Core Principles constitute a Major version increase.

### Compliance
All Pull Requests must verify compliance with these principles. Code reviews must explicitly check for `Decimal` usage and test coverage.

**Version**: 1.0.0 | **Ratified**: 2025-12-03 | **Last Amended**: 2025-12-03