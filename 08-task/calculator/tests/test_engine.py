import pytest
from calculator.engine import CalculatorEngine, TokenType, Token

def test_tokenize_simple_addition():
    engine = CalculatorEngine()
    tokens = engine.tokenize("1 + 2")
    assert len(tokens) == 3
    assert tokens[0] == Token(TokenType.NUMBER, "1")
    assert tokens[1] == Token(TokenType.OPERATOR, "+")
    assert tokens[2] == Token(TokenType.NUMBER, "2")

def test_tokenize_with_parentheses():
    engine = CalculatorEngine()
    tokens = engine.tokenize("( 1 + 2 )")
    assert len(tokens) == 5
    assert tokens[0] == Token(TokenType.LPAREN, "(")
    assert tokens[1] == Token(TokenType.NUMBER, "1")
    assert tokens[2] == Token(TokenType.OPERATOR, "+")
    assert tokens[3] == Token(TokenType.NUMBER, "2")
    assert tokens[4] == Token(TokenType.RPAREN, ")")

def test_tokenize_ignore_whitespace():
    engine = CalculatorEngine()
    tokens = engine.tokenize("  1   +   2  ")
    assert len(tokens) == 3
    assert tokens[0].value == "1"
    assert tokens[1].value == "+"
    assert tokens[2].value == "2"

def test_to_rpn_simple_addition():
    engine = CalculatorEngine()
    # 1 + 2 -> 1 2 +
    tokens = [
        Token(TokenType.NUMBER, "1"),
        Token(TokenType.OPERATOR, "+"),
        Token(TokenType.NUMBER, "2")
    ]
    rpn = engine.to_rpn(tokens)
    assert len(rpn) == 3
    assert rpn[0].value == "1"
    assert rpn[1].value == "2"
    assert rpn[2].value == "+"

def test_to_rpn_precedence():
    engine = CalculatorEngine()
    # 1 + 2 * 3 -> 1 2 3 * +
    tokens = [
        Token(TokenType.NUMBER, "1"),
        Token(TokenType.OPERATOR, "+"),
        Token(TokenType.NUMBER, "2"),
        Token(TokenType.OPERATOR, "*"),
        Token(TokenType.NUMBER, "3")
    ]
    rpn = engine.to_rpn(tokens)
    assert len(rpn) == 5
    assert [t.value for t in rpn] == ["1", "2", "3", "*", "+"]

def test_to_rpn_parentheses():
    engine = CalculatorEngine()
    # ( 1 + 2 ) * 3 -> 1 2 + 3 *
    tokens = [
        Token(TokenType.LPAREN, "("),
        Token(TokenType.NUMBER, "1"),
        Token(TokenType.OPERATOR, "+"),
        Token(TokenType.NUMBER, "2"),
        Token(TokenType.RPAREN, ")"),
        Token(TokenType.OPERATOR, "*"),
        Token(TokenType.NUMBER, "3")
    ]
    rpn = engine.to_rpn(tokens)
    assert len(rpn) == 5
    assert [t.value for t in rpn] == ["1", "2", "+", "3", "*"]

def test_evaluate_rpn_simple():
    engine = CalculatorEngine()
    # 1 2 + -> 3
    rpn = [
        Token(TokenType.NUMBER, "1"),
        Token(TokenType.NUMBER, "2"),
        Token(TokenType.OPERATOR, "+")
    ]
    result = engine.evaluate_rpn(rpn)
    assert result == Decimal("3")

def test_evaluate_rpn_complex():
    engine = CalculatorEngine()
    # 1 2 3 * + -> 7
    rpn = [
        Token(TokenType.NUMBER, "1"),
        Token(TokenType.NUMBER, "2"),
        Token(TokenType.NUMBER, "3"),
        Token(TokenType.OPERATOR, "*"),
        Token(TokenType.OPERATOR, "+")
    ]
    result = engine.evaluate_rpn(rpn)
    assert result == Decimal("7")


