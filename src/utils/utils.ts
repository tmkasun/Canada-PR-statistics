export function isNumeric(str: string | number) {
  throw new Error("Not implemented!");
}

export function cumulativeSum(array: number[]) {
  let result = [];
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    if (i == 0) {
    } else {
      sum += array[i - 1];
    }
    result.push(sum);
  }

  return result;
}
