# Research: Python CLI Calculator

## 1. Parsing Strategy
**Question**: How to safely and precisely evaluate mathematical strings?
**Options**:
1. `eval()`: Unsafe, hard to force `Decimal` everywhere without globals hacking.
2. `ast.literal_eval`: Too restricted (doesn't support operators).
3. Custom Parser (Shunting-Yard or Recursive Descent).

**Decision**: **Shunting-Yard Algorithm**.
**Rationale**: 
- **Safety**: No code execution risk.
- **Precision**: We control tokenization, so we can convert numbers directly to `Decimal` before calculation.
- **Standard**: Well-understood algorithm for infix expressions (PEMDAS support).
- **Explicit Errors**: Easy to detect mismatched parentheses or invalid tokens during parsing.

## 2. CLI vs REPL Integration
**Question**: How to support both modes seamlessly?
**Decision**: Check `sys.argv`.
- If `len(sys.argv) > 1`: Pass rest of args to `argparse` -> Single execution -> Exit.
- If `len(sys.argv) == 1`: Instantiate `cmd.Cmd` subclass -> Enter REPL loop.
**Rationale**: Adheres to Unix philosophy. `cmd` module provides built-in support for prompt, help, and history.

## 3. Decimal Context
**Question**: What precision and rounding?
**Decision**: Default `decimal.Context` (prec=28, rounding=ROUND_HALF_EVEN).
**Rationale**: 28 digits is sufficient for the "scientist/engineer" persona described in the spec. User configuration is out of scope for v1 but the engine should allow passing a context if needed later.

## 4. Directory Structure
**Decision**: Flat package structure for simplicity but modular as per constitution.
```text
calculator/
├── __init__.py
├── main.py
├── cli.py
└── engine.py
```
**Rationale**: "Modular structure: calculator_engine.py (logic), cli.py (UI), main.py (entry)" required by Constitution.
