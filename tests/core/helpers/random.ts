/**
 * Generates a random number of specified length and decimal precision
 *
 * @param length - The total number of digits in the integer part (default: 4)
 * @param decimalPlaces - The number of decimal places (default: 0)
 * @returns A string representation of the random number
 */
export function randomNumbers(
  length = 4,
  decimalNumbers = 0,
  { base = 10 } = {}
) {
  return (
    Math.pow(base, length - 1) +
    Math.random() * 9 * Math.pow(base, length - 1)
  ).toFixed(decimalNumbers);
}

export function randomItem<T>(items: T[]): T {
  if (!items || items.length === 0) {
    throw new Error("Items array must not be empty");
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
