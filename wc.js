const fs = require('fs')

if (process.argv.length !== 3) {
  console.log('usage: node wc.js file.txt')
  process.exit(1)
}

if (!fs.existsSync(process.argv[2])) {
  console.log(`Error: ${process.argv[2]} does not exist`)
  process.exit(1)
}

if (!fs.statSync(process.argv[2]).isFile()) {
  console.log(`Error: ${process.argv[2]} is not a file`)
  process.exit(1)
}

let line = 0
let word = 0
let char = 0

let text = fs.readFileSync(process.argv[2], 'utf-8')

line = text.split('\n').length
word = text.split(' ').length
char = text.length

console.log(` ${line} ${word} ${char} ${process.argv[2]}`)