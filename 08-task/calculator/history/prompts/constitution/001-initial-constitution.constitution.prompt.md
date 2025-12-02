---
id: 001
title: Initial Constitution
stage: constitution
date: 2025-12-03
surface: agent
model: gemini-2.0
feature: none
branch: main
user: codeWithHak
command: /sp.constitution
labels: ["setup", "governance"]
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

/sp.constitution 
Project: Python CLI Calculator

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

Created project constitution v1.0.0 for Python CLI Calculator with 4 core principles (Precision, TDD, Unix, Explicit Errors).

## Outcome

- ✅ Impact: Constitution defined.
- 🧪 Tests: None.
- 📁 Files: Updated constitution.md.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Initial setup.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
