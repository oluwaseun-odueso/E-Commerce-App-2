const a = [1, 2, 3, 4, 5]
const b = [2, 4, 6, 8, 10]
const c = []

const n = [1, 2, 3, 5, 7, 8, 9, 11, 12, 13];
const m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

a.forEach((num1, index) => {
  const num2 = b[index];
  c.push(num1 * num2)
});

const priceArray = [100, 300, 100, 100]
const total = priceArray.reduce((currentTotal, item) => item + currentTotal, 0)
console.log(total)
// console.log(b.reduce((a, b) => a + b, 0))
