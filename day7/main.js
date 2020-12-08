// @format
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// part 1
let bags = {};
let bagsWithAmount = {};

for (let line of input.split('\n')) {
  let parts = line.split(' contain ');

  let bagName = parts[0].substr(0, parts[0].length - 5);
  //add first part - " bags"
  if (bagName) bags[bagName] = [];
  if (bagName) bagsWithAmount[bagName] = [];

  if (parts[1] && parts[1] != 'no other bags.') {
    for (let bagString of parts[1].split(
      / bag, | bags, | bags.| bag.|[0-9] /,
    )) {
      if (bagString) bags[bagName].push(bagString);
    }
    for (let bagString of parts[1].split(/ bag, | bags, | bags.| bag./)) {
      if (bagString) bagsWithAmount[bagName].push(bagString);
    }
  }
}

let count = 0;

for (let bag in bags) {
  if (eventuallyHasShinyGold(bag)) {
    count += 1;
  }
}
console.log(bags);
console.log(bagsWithAmount);

console.log(count);
console.log(countAmount('shiny gold') - 1);

function eventuallyHasShinyGold(bag) {
  if (bags[bag] && bags[bag].includes('shiny gold')) {
    return true;
  } else if (bags[bag]) {
    for (let newBag of bags[bag]) {
      if (eventuallyHasShinyGold(newBag)) {
        return true;
      }
    }
  }
  return false;
}

function countAmount(bag, amount = 1) {
  if (bags[bag].length == 0) return 1 * amount;

  let count = 0;
  for (let newBag of bagsWithAmount[bag]) {
    count += countAmount(newBag.substr(2), Number(newBag[0])) * amount;
  }
  count += amount;

  return count;
}
