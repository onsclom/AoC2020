// @format
const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
input = input.split('\n');
input.splice(input.length - 1);

//x y
let curPos = [0, 0];

//E, S, W, N
let directions = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];

let curDirection = 0;

for (let line of input) {
  let command = line.substr(0, 1);
  let amount = Number(line.substr(1));

  if (command == 'N') {
    curPos[1] += amount;
  } else if (command == 'S') {
    curPos[1] -= amount;
  } else if (command == 'E') {
    curPos[0] += amount;
  } else if (command == 'W') {
    curPos[0] -= amount;
  } else if (command == 'L') {
    let rotations = amount / 90;
    curDirection -= rotations;

    if (curDirection < 0) {
      curDirection += directions.length;
    }
  } else if (command == 'R') {
    let rotations = amount / 90;
    curDirection += rotations;

    if (curDirection < 0) {
      curDirection += directions.length;
    }
  } else if (command == 'F') {
    curPos[0] += directions[curDirection % directions.length][0] * amount;
    curPos[1] += directions[curDirection % directions.length][1] * amount;
  }
}
console.log(Math.abs(curPos[0]) + Math.abs(curPos[1]));

console.log('===== part 2 ======');

function rotate(angle, coords) {
  //counter clockwise by default
  let x = coords[0];
  let y = coords[1];
  let new_x = x * Math.cos(angle) - y * Math.sin(angle);
  let new_y = x * Math.sin(angle) + y * Math.cos(angle);

  return [Math.round(new_x), Math.round(new_y)];
}

//x y
let waypointPos = [10, 1];
let shipPos = [0, 0];

//E, S, W, N
directions = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];

for (let line of input) {
  let command = line.substr(0, 1);
  let amount = Number(line.substr(1));

  if (command == 'N') {
    waypointPos[1] += amount;
  } else if (command == 'S') {
    waypointPos[1] -= amount;
  } else if (command == 'E') {
    waypointPos[0] += amount;
  } else if (command == 'W') {
    waypointPos[0] -= amount;
  } else if (command == 'L') {
    let rotations = amount / 90;

    //rotate waypoint around ship
    let waypointDiff = [
      waypointPos[0] - shipPos[0],
      waypointPos[1] - shipPos[1],
    ];
    waypointDiff = rotate((Math.PI / 2) * rotations, waypointDiff);
    waypointPos = [shipPos[0] + waypointDiff[0], shipPos[1] + waypointDiff[1]];
  } else if (command == 'R') {
    let rotations = amount / 90;

    //rotate waypoint around ship
    let waypointDiff = [
      waypointPos[0] - shipPos[0],
      waypointPos[1] - shipPos[1],
    ];
    waypointDiff = rotate((-Math.PI / 2) * rotations, waypointDiff);
    waypointPos = [shipPos[0] + waypointDiff[0], shipPos[1] + waypointDiff[1]];
  } else if (command == 'F') {
    let waypointDiff = [
      waypointPos[0] - shipPos[0],
      waypointPos[1] - shipPos[1],
    ];
    shipPos = [
      shipPos[0] + waypointDiff[0] * amount,
      shipPos[1] + waypointDiff[1] * amount,
    ];
    waypointPos = [shipPos[0] + waypointDiff[0], shipPos[1] + waypointDiff[1]];
  }
  console.log(`ship: ${shipPos}`);
  console.log(`waypoint: ${waypointPos}`);
}

console.log(shipPos);
console.log(Math.abs(shipPos[0]) + Math.abs(shipPos[1]));
