const fs = require('fs')

const input = fs.readFileSync('./day1_input.txt', 'utf8')
let nums = []
for (let line of input.split('\n')) {
	nums.push(Number(line))
}

//part 1
//could use hashtable for O(n) instead of (n^2), but not necessary
for (let num1 of nums) {
	for (let num2 of nums) {
		if (num1 + num2 == 2020) {
			console.log(num1 * num2)
		}
	}
}

//part 2
console.log("now searching for 3")
for (let num1 of nums) {
	for (let num2 of nums) {
		for (let num3 of nums) {
			if (num1 + num2 + num3 == 2020) {
				console.log(num1 * num2 * num3)
			}
		}
	}
}
