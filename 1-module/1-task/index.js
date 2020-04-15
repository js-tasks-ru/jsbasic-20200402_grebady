/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let fact = 1;
  if (n == 0) return 1;
  for (let i = 1; i <= n; i++) {
      fact *= i;
  }
  return fact;
}
