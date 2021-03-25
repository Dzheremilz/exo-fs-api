const fs = require('fs')

let x = 0
let n;

if (!(process.argv.length === 3 || process.argv.length === 5)) {
  console.log('usage: node tail.js [-n number] file')
  process.exit(1)
}

if (process.argv[2] === '-n') {
  if (!isNaN(process.argv[3])) {
    x = 2
    n = Number(process.argv[3])
    if (n === 0) {
      process.exit(0)
    }
  } else {
    console.log(`Error: ${process.argv[2]} must be followed by a number`)
    process.exit(1)
  }
} else if (process.argv[2][0] === '-') {
  console.log(`Error: ${process.argv[2]} is not an option`)
  process.exit(1)
}

if (!fs.existsSync(process.argv[2 + x])) {
  console.log(`Error: ${process.argv[2 + x]} does not exist`)
  process.exit(1)
}

if (!fs.statSync(process.argv[2 + x]).isFile()) {
  console.log(`Error: ${process.argv[2 + x]} is not a file`)
  process.exit(1)
}

let text = fs.readFileSync(process.argv[2 + x], 'utf-8')

process.stdout.write(text.split('\n').slice(-(n ?? 10)).join('\n'))