import cmd
from calculator.engine import CalculatorEngine

class CalculatorShell(cmd.Cmd):
    intro = "Welcome to Python CLI Calculator. Type 'help' or 'exit'."
    prompt = "> "
    
    def __init__(self, engine: CalculatorEngine):
        super().__init__()
        self.engine = engine

    def do_exit(self, arg: str) -> bool:
        """Exit the calculator."""
        print("Bye!")
        return True

    def default(self, line: str) -> None:
        try:
            result = self.engine.calculate(line)
            print(result)
        except Exception as e:
            print(f"Error: {e}")
