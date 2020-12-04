// @format
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
let valid = 0;

let count = 0;
let curx = 0;
let cury = 0;
let cur = 0;

//part 1
for (let line of input.split('\n')) {
  if (line[curx % line.length] == '#') {
    count += 1;
  }
  curx += 3;
}
console.log(count);

//part 2
let lines = [];
for (let line of input.split('\n')) {
  if (line != undefined) {
    lines.push(line);
  }
}

let total = 1;
for (let slope of [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]) {
  let curx = 0;
  let cury = 0;

  let cur_count = 0;
  while (cury < lines.length) {
    if (lines[cury][curx % lines[0].length] == '#') {
      cur_count += 1;
    }
    cury += slope[1];
    curx += slope[0];
  }
  total *= cur_count;
}
console.log(total);
