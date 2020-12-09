// @format
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const preambleSize = 25;

const numbers = input.split('\n');
numbers.splice(numbers.length - 1);

for (let i = preambleSize; i < numbers.length; i++) {
  //lets do this the slow brute force way because that is easier
  let previousNums = [];
  for (let j = i - preambleSize; j < i; j++) {
    previousNums.push(Number(numbers[j]));
  }

  let sums = new Set();

  for (let i = 0; i < previousNums.length; i++) {
    for (let j = i + 1; j < previousNums.length; j++) {
      sums.add(previousNums[i] + previousNums[j]);
    }
  }

  if (sums.has(Number(numbers[i])) == false) {
    console.log('bad number!');
    console.log(numbers[i]);
    break;
  }
}

const goal = 1309761972;
let hitGoal = false;

for (let i = 0; i < numbers.length; i++) {
  let cur = 0;
  let seen = [];
  for (let j = i; j < numbers.length; j++) {
    cur += Number(numbers[j]);
    seen.push(Number(numbers[j]));

    console.log(seen);

    if (cur == goal) {
      console.log(seen);
      console.log('hit goal!');
      hitGoal = true;
      console.log(Math.min(...seen) + Math.max(...seen));
    } else if (cur > goal) {
      break;
    }
  }
  if (hitGoal) break;
}
