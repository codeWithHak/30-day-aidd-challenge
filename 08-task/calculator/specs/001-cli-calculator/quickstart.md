# Quickstart / API Contract

## CLI Usage

### Argument Mode
Evaluate a single expression and print the result to stdout.

```bash
# Basic
python main.py "2 + 2"
# Output: 4

# Complex
python main.py "0.1 + 0.2"
# Output: 0.3

# Error
python main.py "1 / 0"
# Output (stderr): Error: Division by zero
# Exit Code: 1
```

### Interactive Mode (REPL)
Start the shell by running without arguments.

```bash
python main.py
```

**Session Example**:
```text
Welcome to Python CLI Calculator. Type 'help' or 'exit'.
> 1 + 1
2
> 5 * (2 + 3)
25
> exit
Bye!
```

## Internal API (Engine)

For library usage (if imported):

```python
from calculator.engine import CalculatorEngine
from decimal import Decimal

engine = CalculatorEngine()

# Success
result = engine.calculate("0.1 + 0.2")
assert result == Decimal("0.3")

# Error Handling
try:
    engine.calculate("1 / 0")
except ZeroDivisionError:
    print("Captured math error")
except ValueError as e:
    print(f"Invalid input: {e}")
```
