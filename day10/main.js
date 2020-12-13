// @format
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const numbers = input.split('\n');
numbers.splice(numbers.length - 1);

let nums = [];
nums.push(0);
let nums_set = new Set();
nums_set.add(0);

for (number of numbers) {
  if (number) {
    nums.push(Number(number));
    nums_set.add(Number(number));
  }
}

nums.sort((a, b) => (a > b ? 1 : -1));
console.log(nums);

let diff1 = 0;
let diff3 = 0;

for (let i = 0; i < nums.length - 1; i++) {
  if (nums[i + 1] - nums[i] == 3) {
    diff3 += 1;
  } else if (nums[i + 1] - nums[i] == 1) {
    diff1 += 1;
  }
}

diff3 += 1;

console.log(`${diff1} ${diff3}`);
console.log(diff1 * diff3);

let num_dict = {};
num_dict[0] = 1;

for (let i = 1; i < nums.length; i++) {
  let count = 0;
  console.log(`doing ${nums[i]}:`);
  for (sub of [1, 2, 3]) {
    if (num_dict[nums[i] - sub] != null) {
      console.log(`found ${nums[i] - sub}`);
      count += num_dict[nums[i] - sub];
    }
  }

  num_dict[nums[i]] = count;
}

console.log(num_dict);
