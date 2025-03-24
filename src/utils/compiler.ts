
// Token types
export enum TokenType {
  KEYWORD = 'KEYWORD',
  IDENTIFIER = 'IDENTIFIER',
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  OPERATOR = 'OPERATOR',
  PUNCTUATION = 'PUNCTUATION',
  WHITESPACE = 'WHITESPACE',
  COMMENT = 'COMMENT',
  UNKNOWN = 'UNKNOWN'
}

// Token interface
export interface Token {
  type: TokenType;
  value: string;
  position: {
    start: number;
    end: number;
  };
}

// Keywords
const KEYWORDS = [
  'if', 'else', 'while', 'for', 'function', 'return',
  'var', 'let', 'const', 'int', 'float', 'boolean', 
  'string', 'class', 'new', 'this', 'true', 'false'
];

// Operators
const OPERATORS = [
  '+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=',
  '&&', '||', '!', '&', '|', '^', '~', '<<', '>>>', '>>'
];

// Punctuation
const PUNCTUATION = [
  '{', '}', '(', ')', '[', ']', '.', ',', ';', ':', '?'
];

// Helper function to identify token type
const getTokenType = (lexeme: string): TokenType => {
  if (KEYWORDS.includes(lexeme)) {
    return TokenType.KEYWORD;
  }
  
  if (/^[0-9]+(\.[0-9]+)?$/.test(lexeme)) {
    return TokenType.NUMBER;
  }
  
  if (/^".*"$/.test(lexeme) || /^'.*'$/.test(lexeme)) {
    return TokenType.STRING;
  }
  
  if (OPERATORS.includes(lexeme)) {
    return TokenType.OPERATOR;
  }
  
  if (PUNCTUATION.includes(lexeme)) {
    return TokenType.PUNCTUATION;
  }
  
  if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(lexeme)) {
    return TokenType.IDENTIFIER;
  }
  
  if (/^\s+$/.test(lexeme)) {
    return TokenType.WHITESPACE;
  }
  
  if (/^\/\/.*$/.test(lexeme) || /^\/\*[\s\S]*\*\/$/.test(lexeme)) {
    return TokenType.COMMENT;
  }
  
  return TokenType.UNKNOWN;
};

// Tokenize function - simple implementation
export const tokenize = (code: string): Token[] => {
  const tokens: Token[] = [];
  let current = 0;
  
  while (current < code.length) {
    let char = code[current];
    
    // Handle whitespace
    if (/\s/.test(char)) {
      let start = current;
      while (current < code.length && /\s/.test(code[current])) {
        current++;
      }
      
      tokens.push({
        type: TokenType.WHITESPACE,
        value: code.slice(start, current),
        position: { start, end: current }
      });
      
      continue;
    }
    
    // Handle comments
    if (char === '/' && code[current + 1] === '/') {
      let start = current;
      current += 2; // Skip //
      
      while (current < code.length && code[current] !== '\n') {
        current++;
      }
      
      tokens.push({
        type: TokenType.COMMENT,
        value: code.slice(start, current),
        position: { start, end: current }
      });
      
      continue;
    }
    
    if (char === '/' && code[current + 1] === '*') {
      let start = current;
      current += 2; // Skip /*
      
      while (current < code.length && !(code[current] === '*' && code[current + 1] === '/')) {
        current++;
      }
      
      current += 2; // Skip */
      
      tokens.push({
        type: TokenType.COMMENT,
        value: code.slice(start, current),
        position: { start, end: current }
      });
      
      continue;
    }
    
    // Handle strings
    if (char === '"' || char === "'") {
      let start = current;
      const quote = char;
      current++; // Skip opening quote
      
      while (current < code.length && code[current] !== quote) {
        if (code[current] === '\\') {
          current++; // Skip escape character
        }
        current++;
      }
      
      current++; // Skip closing quote
      
      tokens.push({
        type: TokenType.STRING,
        value: code.slice(start, current),
        position: { start, end: current }
      });
      
      continue;
    }
    
    // Handle numbers
    if (/[0-9]/.test(char)) {
      let start = current;
      
      while (current < code.length && /[0-9]/.test(code[current])) {
        current++;
      }
      
      // Handle decimal points
      if (code[current] === '.' && /[0-9]/.test(code[current + 1])) {
        current++; // Skip .
        
        while (current < code.length && /[0-9]/.test(code[current])) {
          current++;
        }
      }
      
      tokens.push({
        type: TokenType.NUMBER,
        value: code.slice(start, current),
        position: { start, end: current }
      });
      
      continue;
    }
    
    // Handle identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      let start = current;
      
      while (current < code.length && /[a-zA-Z0-9_]/.test(code[current])) {
        current++;
      }
      
      const value = code.slice(start, current);
      const type = KEYWORDS.includes(value) ? TokenType.KEYWORD : TokenType.IDENTIFIER;
      
      tokens.push({
        type,
        value,
        position: { start, end: current }
      });
      
      continue;
    }
    
    // Check for multi-character operators
    let isOperator = false;
    for (let i = 3; i > 0; i--) {
      const op = code.slice(current, current + i);
      if (OPERATORS.includes(op)) {
        tokens.push({
          type: TokenType.OPERATOR,
          value: op,
          position: { start: current, end: current + i }
        });
        current += i;
        isOperator = true;
        break;
      }
    }
    
    if (isOperator) continue;
    
    // Check for punctuation
    if (PUNCTUATION.includes(char)) {
      tokens.push({
        type: TokenType.PUNCTUATION,
        value: char,
        position: { start: current, end: current + 1 }
      });
      current++;
      continue;
    }
    
    // Handle unknown characters
    tokens.push({
      type: TokenType.UNKNOWN,
      value: char,
      position: { start: current, end: current + 1 }
    });
    current++;
  }
  
  return tokens;
};

// Generate lexemes from code
export const generateLexemes = (code: string): string[] => {
  const tokens = tokenize(code);
  return tokens
    .filter(token => token.type !== TokenType.WHITESPACE)
    .map(token => token.value);
};

// Simple expression evaluator (limited to basic math operations)
export const evaluateExpression = (expression: string): { result: number | string, steps: string[] } => {
  try {
    // This is a simplified evaluator for demo purposes
    // In a real implementation, you would use a proper parser
    const steps: string[] = [];
    steps.push(`Original expression: ${expression}`);
    
    // Remove whitespace
    expression = expression.replace(/\s+/g, '');
    steps.push(`Remove whitespace: ${expression}`);
    
    // Tokenize
    const tokens = tokenize(expression)
      .filter(token => token.type !== TokenType.WHITESPACE);
    steps.push(`Tokenize: ${JSON.stringify(tokens.map(t => t.value))}`);
    
    // Very basic evaluation (unsafe, for demo only)
    // eslint-disable-next-line no-eval
    const result = eval(expression);
    steps.push(`Evaluate: ${result}`);
    
    return { result, steps };
  } catch (error) {
    return { 
      result: "Error evaluating expression", 
      steps: [`Error: ${(error as Error).message}`] 
    };
  }
};

// Mock function for CFG checking (to be implemented in future)
export const checkCFG = (
  grammar: string, 
  testString: string
): { accepted: boolean, steps: string[] } => {
  // This is just a mock implementation
  const steps: string[] = [];
  steps.push(`Grammar: ${grammar}`);
  steps.push(`Test string: ${testString}`);
  steps.push("Parsing steps would be shown here");
  
  // For demo purposes, accept strings that start with 'a' and end with 'b'
  const accepted = testString.startsWith('a') && testString.endsWith('b');
  
  return { accepted, steps };
};
