import pytest
from unittest.mock import MagicMock
from calculator.cli import CalculatorShell
from calculator.engine import CalculatorEngine
from decimal import Decimal

def test_repl_calculate_success(capsys):
    # Mock engine
    mock_engine = MagicMock(spec=CalculatorEngine)
    mock_engine.calculate.return_value = Decimal("4")
    
    shell = CalculatorShell(mock_engine)
    
    # Simulate input "2 + 2" via default handler since Cmd uses stdin which is hard to mock cleanly in unit tests
    # But standard way to test Cmd logic is often to call the methods directly if they map 1:1
    # However, 'default' is what handles non-command inputs
    shell.default("2 + 2")
    
    mock_engine.calculate.assert_called_with("2 + 2")
    
    captured = capsys.readouterr()
    assert "4" in captured.out

def test_repl_exit():
    shell = CalculatorShell(MagicMock())
    assert shell.do_exit("") is True
