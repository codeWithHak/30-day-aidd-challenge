import sys
from calculator.engine import CalculatorEngine
from calculator.cli import CalculatorShell

def main() -> None:
    engine = CalculatorEngine()
    
    if len(sys.argv) > 1:
        # Argument mode
        expression = " ".join(sys.argv[1:])
        try:
            result = engine.calculate(expression)
            print(result)
        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        # REPL mode
        shell = CalculatorShell(engine)
        shell.cmdloop()

if __name__ == "__main__":
    main()
