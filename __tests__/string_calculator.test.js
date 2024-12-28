const StringCalculator = require('../StringCalculator');

describe('StringCalculator', () => {
  let calc;

  beforeEach(() => {
    calc = new StringCalculator();
  });

  test('should return 0 for an empty string', () => {
    expect(calc.add('')).toBe(0);
  });

  test('should return the number for a single number', () => {
    expect(calc.add('1')).toBe(1);
  });

  test('should return the sum for two numbers', () => {
    expect(calc.add('1,2')).toBe(3);
  });

  test('should handle an unknown number of numbers', () => {
    expect(calc.add('1,2,3,4')).toBe(10);
  });

  test('should handle newlines between numbers', () => {
    expect(calc.add('1\n2,3')).toBe(6);
  });

  test('should handle custom single-character delimiters', () => {
    expect(calc.add('//;\n1;2')).toBe(3);
  });

  test('should throw an error for negative numbers', () => {
    expect(() => calc.add('-1,2')).toThrow('Negatives not allowed: -1');
  });

  test('should throw an error for multiple negative numbers', () => {
    expect(() => calc.add('-1,-2,3')).toThrow('Negatives not allowed: -1, -2');
  });

  test('should ignore numbers greater than 1000', () => {
    expect(calc.add('2,1001')).toBe(2);
  });

  test('should handle custom delimiters of any length', () => {
    expect(calc.add('//[***]\n1***2***3')).toBe(6);
  });

  test('should handle multiple delimiters', () => {
    expect(calc.add('//[*][%]\n1*2%3')).toBe(6);
  });

  test('should handle multiple delimiters with length longer than one character', () => {
    expect(calc.add('//[***][%%%]\n1***2%%%3')).toBe(6);
  });
});
