// @format
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

//part1
let seen = new Set();
let count = 0;
for (let line of input.split('\n')) {
  for (let char of line) {
    if (!seen.has(char) && char != '\n') {
      seen.add(char);
      count += 1;
    }
  }
  if (line == '') {
    seen = new Set();
  }
}
console.log(count);

//part2
seen = {};
count = 0;
let members = 0;
for (let line of input.split('\n')) {
  if (line == '') {
    for (let char in seen) {
      if (seen[char] == members) {
        count += 1;
      }
    }
    seen = {};
    members = 0;
  } else {
    members += 1;
    for (let char of line) {
      if (seen[char] == null) {
        seen[char] = 1;
      } else {
        seen[char] = seen[char] + 1;
      }
    }
  }
}
console.log(count);
