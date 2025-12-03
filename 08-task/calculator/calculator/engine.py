from enum import Enum
from dataclasses import dataclass
from decimal import Decimal, Context, ROUND_HALF_EVEN
from typing import Union

class CalculationError(Exception):
    pass

class InvalidExpressionError(CalculationError):
    pass

class MathError(CalculationError):
    pass

class TokenType(Enum):
    NUMBER = "NUMBER"
    OPERATOR = "OPERATOR"
    LPAREN = "LPAREN"
    RPAREN = "RPAREN"

@dataclass
class Token:
    type: TokenType
    value: str

DEFAULT_CONTEXT = Context(prec=28, rounding=ROUND_HALF_EVEN)

class CalculatorEngine:
    def __init__(self, context: Context = DEFAULT_CONTEXT):
        self.context = context

    def tokenize(self, expression: str) -> list[Token]:
        tokens = []
        i = 0
        while i < len(expression):
            char = expression[i]
            
            if char.isspace():
                i += 1
                continue
            
            if char in "+-*/":
                tokens.append(Token(TokenType.OPERATOR, char))
                i += 1
            elif char == "(":
                tokens.append(Token(TokenType.LPAREN, char))
                i += 1
            elif char == ")":
                tokens.append(Token(TokenType.RPAREN, char))
                i += 1
            elif char.isdigit() or char == '.':
                num_str = char
                i += 1
                while i < len(expression) and (expression[i].isdigit() or expression[i] == '.'):
                    num_str += expression[i]
                    i += 1
                tokens.append(Token(TokenType.NUMBER, num_str))
            else:
                raise InvalidExpressionError(f"Invalid character: {char}")
                
        return tokens

    def to_rpn(self, tokens: list[Token]) -> list[Token]:
        output_queue: list[Token] = []
        operator_stack: list[Token] = []
        
        precedence = {'+': 1, '-': 1, '*': 2, '/': 2}
        
        for token in tokens:
            if token.type == TokenType.NUMBER:
                output_queue.append(token)
            elif token.type == TokenType.OPERATOR:
                while (operator_stack and 
                       operator_stack[-1].type == TokenType.OPERATOR and
                       precedence[operator_stack[-1].value] >= precedence[token.value]):
                    output_queue.append(operator_stack.pop())
                operator_stack.append(token)
            elif token.type == TokenType.LPAREN:
                operator_stack.append(token)
            elif token.type == TokenType.RPAREN:
                while operator_stack and operator_stack[-1].type != TokenType.LPAREN:
                    output_queue.append(operator_stack.pop())
                if not operator_stack:
                    raise InvalidExpressionError("Mismatched parentheses")
                operator_stack.pop() # Pop LPAREN
        
        while operator_stack:
            if operator_stack[-1].type == TokenType.LPAREN:
                raise InvalidExpressionError("Mismatched parentheses")
            output_queue.append(operator_stack.pop())
            
        return output_queue

    def evaluate_rpn(self, rpn_tokens: list[Token]) -> Decimal:
        stack: list[Decimal] = []
        
        for token in rpn_tokens:
            if token.type == TokenType.NUMBER:
                stack.append(Decimal(token.value))
            elif token.type == TokenType.OPERATOR:
                if len(stack) < 2:
                    raise InvalidExpressionError("Invalid expression")
                b = stack.pop()
                a = stack.pop()
                
                if token.value == '+':
                    result = a + b
                elif token.value == '-':
                    result = a - b
                elif token.value == '*':
                    result = a * b
                elif token.value == '/':
                    if b == 0:
                        raise MathError("Division by zero")
                    result = a / b
                else:
                    raise InvalidExpressionError(f"Unknown operator: {token.value}")
                
                stack.append(result)
                
        if len(stack) != 1:
             raise InvalidExpressionError("Invalid expression")
             
        return stack[0]

    def calculate(self, expression: str) -> Decimal:
        tokens = self.tokenize(expression)
        rpn = self.to_rpn(tokens)
        return self.evaluate_rpn(rpn)