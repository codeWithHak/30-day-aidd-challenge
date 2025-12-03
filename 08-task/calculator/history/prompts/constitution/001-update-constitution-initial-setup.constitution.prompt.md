---
id: 001
title: update-constitution-initial-setup
stage: constitution
date: 2025-12-03
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: 001-cli-calculator
user: codeWithHak
command: /sp.constitution
labels: ["setup", "constitution", "principles"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution Project: Python CLI Calculator

Core principles:
- Precision First: Use Decimal for all calculations (zero tolerance for floating-point errors)
- Test-Driven Development: Write tests before implementation (Red-Green-Refactor mandatory)
- Unix Philosophy: Text-based I/O only; do one thing well
- Explicit Errors: Clear error messages for invalid input, division by zero, overflow

Key standards:
- Python 3.12+ with type hints (mypy strict mode)
- pytest with 80%+ coverage
- argparse for CLI arguments, cmd for interactive REPL
- PEP 8 compliant code
- Modular structure: calculator_engine.py (logic), cli.py (UI), main.py (entry)

Constraints:
- Terminal only (no GUI libraries)
- Standard Library preferred (minimal external dependencies)
- Cross-platform (Linux/Windows/macOS)
- Instant startup (<100ms)
- Support argument mode: calc 2 + 2
- Support interactive REPL mode

Success criteria:
- Correct arithmetic with parentheses and order of operations
- 0.1 + 0.2 == 0.3 (Decimal precision validated)
- Never crashes on invalid input or edge cases
- --help provides clear usage instructions
- Runs directly via python without complex setup

## Response snapshot

Updated project constitution with core principles (Precision, TDD, Unix, Explicit Errors), standards, and constraints.

## Outcome

- ✅ Impact: Constitution ratified v1.0.0.
- 🧪 Tests: None
- 📁 Files: Updated constitution.md
- 🔁 Next prompts: /sp.plan or /sp.spec
- 🧠 Reflection: Initial setup of governance docs.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
