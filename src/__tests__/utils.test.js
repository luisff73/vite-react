
import { sum, isPar, isImpar } from '../utils';

describe('Utility functions', () => {
  // Test 1: Verificar la función de suma
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  // Test 2: Verificar si un número es par
  test('checks if 4 is an even number', () => {
    expect(isPar(4)).toBe(true);
  });

  test('checks if 5 is not an even number', () => {
    expect(isPar(5)).toBe(false);
  });

  // Test 3: Verificar si un número es impar
  test('checks if 5 is an odd number', () => {
    expect(isImpar(5)).toBe(true);
  });

  test('checks if 4 is not an odd number', () => {
    expect(isImpar(4)).toBe(false);
  });
});
