const fs = require('fs')

let noOption = true

if (process.argv.length !== 3 && !(process.argv.length === 4 && process.argv[2][0] === '-')) {
  console.log('usage: node wc.js [-option (l, w, c)] file.txt')
  process.exit(1)
}
let x = 0
if (process.argv[2][0] === '-' && !(process.argv[2][1] === 'l' || process.argv[2][1] === 'w' || process.argv[2][1] === 'c')) {
  console.log(`Error: ${process.argv[2]} is not an option`)
  process.exit(1)
}

if (process.argv[2][0] === '-') {
  x = 1
  noOption = false
}

if (!fs.existsSync(process.argv[2 + x])) {
  console.log(`Error: ${process.argv[2 + x]} does not exist`)
  process.exit(1)
}

let line = 0
let word = 0
let char = 0
let str = ' '

if (!fs.statSync(process.argv[2 + x]).isFile()) {
  if (fs.statSync(process.argv[2 + x]).isDirectory()) {
    console.log(`Error: ${process.argv[2 + x]}: Is a directory`)
    console.log(`      ${line}       ${word}       ${char} ${process.argv[2 + x]}`)
    process.exit(1)
  }
  console.log(`Error: ${process.argv[2 + x]} is not a file`)
  process.exit(1)
}

let text = fs.readFileSync(process.argv[2 + x], 'utf-8')

if (process.argv[2][1] === 'l' || noOption) {
  line = text.split('\n').length
  str += line + ' '
}
if (process.argv[2][1] === 'w' || noOption) {
  word = text.split(' ').length
  str += word + ' '
}
if (process.argv[2][1] === 'c' || noOption) {
  char = text.length
  str += char + ' '
}

console.log(`${str}${process.argv[2 + x]}`)