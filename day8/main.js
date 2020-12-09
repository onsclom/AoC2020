// @format
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

let seen = new Set();
code = input.split('\n');
code.splice(code.length - 1);
let cur = 0;
let acc = 0;

let importants = [];

while (cur < code.length) {
  if (seen.has(cur)) {
    break;
  }
  seen.add(cur);

  if (code[cur].split(' ')[0] == 'acc') {
    acc += Number(code[cur].split(' ')[1]);
    cur += 1;
  } else if (code[cur].split(' ')[0] == 'jmp') {
    importants.push(cur);
    cur += Number(code[cur].split(' ')[1]);
  } else if (code[cur].split(' ')[0] == 'nop') {
    importants.push(cur);
    cur += 1;
  }
}

console.log(acc);
console.log(importants);

for (let i of importants) {
  let modifiedCode = [...code];

  if (modifiedCode[i].split(' ')[0] == 'jmp') {
    modifiedCode[i] = 'nop ' + modifiedCode[i].split(' ')[1];
  } else {
    modifiedCode[i] = 'jmp ' + modifiedCode[i].split(' ')[1];
  }

  cur = 0;
  acc = 0;
  seen = new Set();

  while (cur < code.length) {
    if (seen.has(cur)) {
      break;
    }
    seen.add(cur);

    if (modifiedCode[cur].split(' ')[0] == 'acc') {
      acc += Number(modifiedCode[cur].split(' ')[1]);
      cur += 1;
    } else if (modifiedCode[cur].split(' ')[0] == 'jmp') {
      cur += Number(modifiedCode[cur].split(' ')[1]);
    } else if (modifiedCode[cur].split(' ')[0] == 'nop') {
      cur += 1;
    }
  }

  if (cur == code.length) {
    console.log('success!');
    console.log(acc);
    console.log(`the bad instruction: ${i}`);
    break;
  }
}
