// @format
const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
input = input.split('\n');
input.splice(input.length - 1);

let memory = {};

let mask;

let memoryRow = [];
for (let i = 0; i < 32; i++) {
  memoryRow.push(0);
}

for (let i = 0; i < input.length; i++) {
  if (input[i].substr(0, 4) == 'mask') {
    mask = input[i].split(' ')[2];
    console.log(`new mask: ${mask}`);
  } else {
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
    binaryString = applyMask(binaryString);
    memory[memAddress] = [...binaryString];
  }
}

let sum = 0;
for (let value in memory) {
  sum += parseInt('0' + memory[value].join(''), 2);
}

console.log(sum);

function applyMask(binString) {
  let newBin = [];
  for (let i = 0; i < 36; i++) {
    if (mask[i] == 'X') {
      newBin.push(binString[i]);
    } else {
      newBin.push(Number(mask[i]));
    }
  }
  return newBin;
}

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

//part 2

memory = {};

mask;

memoryRow = [];
for (let i = 0; i < 32; i++) {
  memoryRow.push(0);
}

for (let i = 0; i < input.length; i++) {
  if (input[i].substr(0, 4) == 'mask') {
    mask = input[i].split(' ')[2];
    console.log(`new mask: ${mask}`);
  } else {
    let memAddress = input[i].split(' = ')[0];
    memAddress = memAddress.split('[')[1];
    memAddress = memAddress.substr(0, memAddress.length - 1);
    memAddress = Number(memAddress);

    console.log(memAddress);

    let num = input[i].split(' = ')[1];
    const preBinaryValue = Number(num);
    let binaryString = getBinary(memAddress);
    binaryStrings = applyMask2(binaryString);

    for (let part of binaryStrings) {
      console.log(part);

      const memAddressToChange = parseInt(part.join(''), 2);
      console.log(`setting ${memAddressToChange} to ${preBinaryValue}`);
      memory[memAddressToChange] = preBinaryValue;
    }
  }
}

console.log(memory);

sum = 0;
for (let addr in memory) {
  sum += memory[addr];
  console.log(`${addr}:${memory[addr]}`);
}

console.log(sum);

//given a binary string, use mask to get all variants
function applyMask2(binaryString) {
  console.log(`mask is ${mask}`);
  console.log(`binstring is ${binaryString.join('')}`);
  let possibles = [];

  let xCount = 0;

  for (let part of mask) {
    if (part == 'X') {
      xCount += 1;
    }
  }

  for (let i = 0; i < 2 ** xCount; i++) {
    let newPossible = [];
    let curX = 0;

    let curBin = i.toString(2);
    for (let j = curBin.length; j < xCount; j++) {
      curBin = '0' + curBin;
    }
    console.log(`curBin is ${curBin}`);

    for (let j = 0; j < 36; j++) {
      if (mask[j] == '0') {
        newPossible.push(binaryString[j]);
      } else if (mask[j] == '1') {
        newPossible.push(1);
      } else {
        newPossible.push(curBin[curX]);
        curX += 1;
      }
    }
    possibles.push(newPossible);
  }

  return possibles;
}
