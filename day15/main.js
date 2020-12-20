// @format
const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
input = input.split(',');

let cur = 0;

let seen = {};
let last;

for (let num of input) {
  if (last != null) {
    seen[last] = cur;
  }
  const curNum = Number(num);

  cur += 1;
  last = curNum;
}

console.log(seen);

while (cur < 30000000) {
  //look for last

  if (seen[last] == null) {
    curNum = 0;
  } else {
    curNum = cur - seen[last];
  }

  seen[last] = cur;

  cur += 1;
  last = curNum;
  if (cur % 10000 == 0) console.log(cur);
}

console.log(curNum);
