// @format
const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
let changed = 1;
let occupied = 0;

input = input.split('\n');
input.splice(input.length - 1, 1);

let seats = [];

for (line of input) {
  let row = [];
  for (seat of line) {
    row.push(seat);
  }
  seats.push(row);
}

while (changed != 0) {
  updateSeats();
}

console.log(occupied);

function updateSeats() {
  let seatsCopy = [];
  for (row of seats) {
    seatsCopy.push([...row]);
  }

  changed = 0;
  for (let y = 0; y < seats.length; y++) {
    for (let x = 0; x < seats[0].length; x++) {
      let occupiedNeighbors = getOccupied(x, y, seatsCopy);

      if (seats[y][x] == 'L' && occupiedNeighbors == 0) {
        seats[y][x] = '#';
        changed += 1;
      } else if (seats[y][x] == '#' && occupiedNeighbors >= 4) {
        seats[y][x] = 'L';
        changed += 1;
      }
    }
  }

  occupied = 0;
  for (let row of seats) {
    for (let seat of row) {
      if (seat == '#') {
        occupied += 1;
      }
    }
  }
}

function getOccupied(x, y, seats) {
  let occupied = 0;

  for (let offset_pair of [
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ]) {
    let newX = x + offset_pair[0];
    let newY = y + offset_pair[1];
    if (
      newX >= 0 &&
      newX < seats[0].length &&
      newY >= 0 &&
      newY < seats.length
    ) {
      if (seats[newY][newX] == '#') {
        occupied += 1;
      }
    }
  }

  return occupied;
}
