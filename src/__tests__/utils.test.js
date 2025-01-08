
import { sum, isPar, isImpar } from '../utils';

describe('Utility functions', () => {
  // Test 1: Verificar la función de suma
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  // Test 2: Verificar si un número es par
  test('Test verificacion si 4 es un numero par', () => { 
    expect(isPar(4)).toBe(true);
  });

  test('Test verificacion si 5 es un numero par', () => {
    expect(isPar(5)).toBe(false);
  });

  // Test 3: Verificar si un número es impar
  test('Test verificacion si 5 es un numero impar', () => {
    expect(isImpar(5)).toBe(true);
  });

  test('Test verificacion si 4 es un numero impar', () => {
    expect(isImpar(4)).toBe(false);
  });
});
