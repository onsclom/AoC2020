// @format
const fs = require('fs');

const input = fs.readFileSync('./day2_input.txt', 'utf8');
let lines = [];
let valid = 0;

//part 1
for (let line of input.split('\n')) {
  if (line != '') {
    const parts = line.split(' ');

    const min = Number(parts[0].split('-')[0]);
    const max = Number(parts[0].split('-')[1]);

    const important_char = parts[1][0];

    let count = 0;
    for (let c of parts[2]) {
      if (c == important_char) {
        count += 1;
      }
    }

    if (count >= min && count <= max) {
      valid += 1;
    }
  }
}
console.log(valid);

valid = 0;
//part 2
for (let line of input.split('\n')) {
  if (line != '') {
    const parts = line.split(' ');

    const first = Number(parts[0].split('-')[0]);
    const second = Number(parts[0].split('-')[1]);

    const important_char = parts[1][0];

    let count = 0;
    for (let c of [first, second]) {
      if (parts[2][c - 1] == important_char) {
        count += 1;
      }
    }

    if (count == 1) {
      valid += 1;
    }
  }
}
console.log(valid);
