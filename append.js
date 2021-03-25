const fs = require('fs')

if (process.argv.length < 4) {
  console.log('usage: node append.js src.txt (src2.txt etc...) dest.txt')
  process.exit(1)
}

//let dest = fs.openSync(process.argv[process.argv.length - 1], 'a')

for (let i = 2; i < process.argv.length - 1; i++) {
  if (!fs.existsSync(process.argv[i])) {
    console.log(`Error: ${process.argv[i]} does not exist`)
    continue
  }
  if (!fs.statSync(process.argv[i]).isFile()) {
    console.log(`Error: ${process.argv[i]} is not a file`)
    continue
  }
  let src = fs.readFileSync(process.argv[i], 'utf-8')
  fs.appendFileSync(process.argv[process.argv.length - 1], src)
}