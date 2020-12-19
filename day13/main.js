// @format
const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
input = input.split('\n');
input.splice(input.length - 1);

const earliest = Number(input[0]);
let nums = [];

for (let num of input[1].split(',')) {
  if (num != 'x') {
    const cur_id = Number(num);
    nums.push(cur_id);
  }
}
console.log(nums);

let cur = earliest;
let done = false;
while (!done) {
  for (let id of nums) {
    if (cur % id == 0) {
      console.log(`id:${id} cur:${cur} ans:${(cur - earliest) * id}`);
      done = true;
      break;
    }
  }

  cur++;
}

console.log('part 2!');

let numPairs = [];
let curNum = 1;
let bestInc = 1;
for (let num of input[1].split(',')) {
  if (num != 'x') {
    numPairs.push([Number(num), curNum]);
  }
  curNum += 1;
}

done = false;
let curI = 1;
while (!done) {
  done = true;
  let possibleI = 1;
  for (let pair of numPairs) {
    if ((curI + pair[1] - 1) % pair[0] != 0) {
      done = false;
      break;
    } else {
      possibleI *= pair[0];
    }

    bestInc = Math.max(possibleI, bestInc);
  }

  if (done) {
    console.log(`WOW`);
    console.log(curI);
  }

  if (curI % 10000 == 0) {
    console.log(curI);
  }

  curI += bestInc;
}
