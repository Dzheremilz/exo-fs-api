const yargs = require('yargs/yargs')(process.argv.slice(2)).strict().option('verbose', { alias: 'v', boolean: true, describe: 'explain what is being done' }).argv
const fs = require('fs')

if (yargs._.length === 0) {
  console.log('node cp.js: missing file operand\nTry node cp.js \'file\' \'copy\' ')
  process.exit(1)
}

if (yargs._.length === 1) {
  console.log(`node cp.js: missing destination file operand after '${yargs._[0]}'`)
  process.exit(1)
}

if (!fs.existsSync(yargs._[0])) {
  console.log(`node cp.js: cannot stat '${yargs._[0]}': No such file or directory`)
  process.exit(1)
}

if (fs.statSync(yargs._[0]).isDirectory()) {
  console.log(`node cp.js: ${yargs._[0]} is a directory: no option yet, come back later`)
  process.exit(1)
}

if (yargs._.length === 2) {
  if (fs.existsSync(yargs._[1]) && fs.statSync(yargs._[1]).isDirectory()) {
    if (yargs._[1] === '.') {
      console.log(`node cp.js: '${yargs._[0]}' and '${yargs._[1] + '/' + yargs._[0]}' are the same file`)
      process.exit(1)
    } else {
      fs.copyFileSync(yargs._[0], yargs._[1] + '/' + yargs._[0].split('/').reverse()[0])
      if (yargs.v) {
        console.log(`\'${yargs._[0]}\' -> \'${yargs._[1] + '/' + yargs._[0].split('/').reverse()[0]}\'`)
      }
      process.exit(0)
    }
  } else {
    if (yargs._[0] === yargs._[1]) {
      console.log(`node cp.js: '${yargs._[0]}' and '${yargs._[1]}' are the same file`)
      process.exit(1)
    } else {
      fs.copyFileSync(yargs._[0], yargs._[1])
      if (yargs.v) {
        console.log(`\'${yargs._[0]}\' -> \'${yargs._[1]}\'`)
      }
      process.exit(0)
    }
  }
}

if (yargs._.length > 2 && fs.existsSync(yargs._[yargs._.length - 1]) && fs.statSync(yargs._[yargs._.length - 1]).isDirectory()) {
  for (let i = 0; i < yargs._.length - 1; i++) {
    if (yargs._[yargs._.length - 1] === '.') {
      console.log(`node cp.js: '${yargs._[i]}' and '${yargs._[yargs._.length - 1] + '/' + yargs._[i]}' are the same file`)
    } else {
      if (!fs.existsSync(yargs._[i])) {
        console.log(`node cp.js: ${yargs._[i]} does not exist`)
        continue
      }
      if (!fs.statSync(yargs._[i]).isFile()) {
        console.log(`node cp.js: ${yargs._[i]} is not a file`)
        continue
      }
      try {
        fs.copyFileSync(yargs._[i], yargs._[yargs._.length - 1] + '/' + yargs._[i].split('/').reverse()[0])
      } catch (e) {
        console.log(`node cp.js: ${e.message}`)
        continue
      }
      if (yargs.v) {
        console.log(`\'${yargs._[i]}\' -> \'${yargs._[yargs._.length - 1] + '/' + yargs._[i].split('/').reverse()[0]}\'`)
      }
    }
  }
} else {
  console.log(`node cp.js: target '${process.argv[process.argv.length - 1]}' is not a directory`)
  process.exit(1)
}