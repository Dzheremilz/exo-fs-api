const fs = require('fs')

// verifie la cmd line
if (process.argv.length < 3) {
  console.log('usage: node cat.js file.txt (file2.txt...)')
  process.exit(1)
}

for (let i = 2; i < process.argv.length; i++) {
  // verifie si le fichier exist
  if (!fs.existsSync(process.argv[i])) {
    console.log(`Error: ${process.argv[i]} does not exist`)
    continue
  }
  // verifie que c'est bien un fichier
  if (!fs.statSync(process.argv[i]).isFile()) {
    console.log(`Error: ${process.argv[i]} is not a file`)
    continue
  }
  // lire le fichier
  let text = fs.readFileSync(process.argv[i], 'utf-8')
  // affiche le contenu du fichier
  process.stdout.write(text)
}