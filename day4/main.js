// @format
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

let ids = new Set();

let highest = 0;
for (let line of input.split('\n')) {
  let row = line.substring(0, 7);
  let col = line.substring(7, 10);
  console.log(row + ' ' + col);

  let sum = 0;
  for (let part of row.split('')) {
    sum *= 2;
    if (part == 'B') {
      sum += 1;
    }
  }
  console.log(sum);

  let sum2 = 0;
  for (let part of col.split('')) {
    sum2 *= 2;
    if (part == 'R') {
      sum2 += 1;
    }
  }
  console.log(sum2);

  let seatId = sum * 8 + sum2;
  ids.add(seatId);
  highest = Math.max(highest, seatId);
}

let found = false;
let seenNumber = false;
let cur = 1;

while (!found) {
  if (ids.has(cur)) {
    seenNumber = true;
  } else if (seenNumber) {
    found = true;
    console.log(cur);
  }
  cur += 1;
}
