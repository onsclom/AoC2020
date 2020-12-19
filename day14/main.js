// @format
const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
input = input.split('\n');
input.splice(input.length - 1);

let memory = {};

let mask = input[0].split(' ')[2];
console.log(mask);

let memoryRow = [];
for (let i = 0; i < 32; i++) {
  memoryRow.push(0);
}

for (let i = 1; i < input.length; i++) {
  let memAddress = input[i].split(' = ')[0];
  memAddress = memAddress.split('[')[1];
  memAddress = memAddress.substr(0, memAddress.length - 1);
  memAddress = Number(memAddress);

  console.log(memAddress);

  if (memory[memAddress] == null) {
    memory[memAddress] = [...memoryRow];
  }

  let num = input[i].split(' = ')[1];
  let binaryString = getBinary(num);
  memory[memAddress] = [...binaryString];
}

let sum = 0;
for (let value in memory) {
  console.log(`mask is ${mask}`);
  let newValue = [];
  for (let i = 0; i < 36; i++) {
    if (mask[i] == 'X') {
      newValue.push(memory[value][i]);
    } else {
      newValue.push(Number(mask[i]));
    }
  }
  memory[value] = newValue;
  sum += parseInt('0' + memory[value].join(''), 2);
}

console.log(sum);

function getBinary(num) {
  let number = Number(num);
  let binary = [];
  for (let i = 35; i >= 0; i--) {
    if (2 ** i <= number) {
      binary.push(1);
      number -= 2 ** i;
    } else {
      binary.push(0);
    }
  }
  return binary;
}
