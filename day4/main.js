// @format
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

let validCount = 0;
let validCount2 = 0;

for (let person of input.split('\n\n')) {
  let required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  let valid = true;

  for (let part of required) {
    if (person.includes(part) == false) {
      valid = false;
      break;
    }
  }

  let valid2 = valid;

  for (let part of person.split(/ |\n/)) {
    if (part != '') {
      let parts = part.split(':');
      checkParts(parts);
      if (!checkParts(parts)) {
        valid2 = false;
        break;
      }
    }
  }

  if (valid) {
    validCount++;
  }
  if (valid2) {
    validCount2++;
  }
}

function checkParts(parts) {
  if (parts[0] == 'byr') {
    return Number(parts[1]) >= 1920 && Number(parts[1]) <= 2002;
  } else if (parts[0] == 'iyr') {
    return Number(parts[1]) >= 2010 && Number(parts[1]) <= 2020;
  } else if (parts[0] == 'eyr') {
    return Number(parts[1]) >= 2020 && Number(parts[1]) <= 2030;
  } else if (parts[0] == 'hgt') {
    if (parts[1].substring(parts[1].length - 2, parts[1].length) == 'cm') {
      let num = Number(parts[1].substring(0, parts[1].length - 2));
      if (num >= 150 && num <= 193) {
        return true;
      } else {
        return false;
      }
    } else if (
      parts[1].substring(parts[1].length - 2, parts[1].length) == 'in'
    ) {
      let num = Number(parts[1].substring(0, parts[1].length - 2));
      if (num >= 59 && num <= 76) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else if (parts[0] == 'hcl') {
    return /#[a-f|0-9]{6}/.test(parts[1]);
  } else if (parts[0] == 'ecl') {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(parts[1]);
  } else if (parts[0] == 'pid') {
    return /[0-9]{9}/.test(parts[1]);
  }

  return true;
}

console.log(validCount);
console.log(validCount2);
