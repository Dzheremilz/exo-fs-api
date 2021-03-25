let str = ''

for (let i = 2; i < process.argv.length; i++) {
  str += process.argv[i] + ' '
}

console.log(str.slice(0, -1))