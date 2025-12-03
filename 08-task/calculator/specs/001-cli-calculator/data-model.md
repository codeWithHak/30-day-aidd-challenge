# Data Model

## Entities

### Token
Represents a single atomic unit of the mathematical expression.

| Field | Type | Description |
|-------|------|-------------|
| `type` | Enum | `NUMBER`, `OPERATOR` (+-*/), `LPAREN` (, `RPAREN` ) |
| `value` | String/Decimal | The actual value (e.g., "2.5", "+") |

### Context (Decimal)
Configuration for the arithmetic environment.

| Field | Default | Description |
|-------|---------|-------------|
| `precision` | 28 | Number of significant digits |
| `rounding` | ROUND_HALF_EVEN | Rounding strategy |

## Components

### CalculatorEngine
The core business logic class.

**State**:
- `context`: `decimal.Context`

**Methods**:
- `tokenize(expression: str) -> List[Token]`
- `to_rpn(tokens: List[Token]) -> List[Token]` (Shunting-Yard)
- `evaluate_rpn(rpn: List[Token]) -> Decimal`
- `calculate(expression: str) -> Decimal` (Facade)

### REPL (Cmd)
The interactive shell state.

**State**:
- `history`: List[str] (Managed by `readline` via `cmd`)
- `engine`: `CalculatorEngine`

## Error Handling
The engine raises specific exceptions that the CLI catches and formats.

- `CalculationError` (Base)
  - `InvalidExpressionError`: Malformed syntax, unbalanced parens.
  - `MathError`: Division by zero, Overflow.
