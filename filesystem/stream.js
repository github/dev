const fs = require('fs')

const rf = fs.createReadStream('target.txt')
const wf = fs.createWriteStream('target-2.txt')

//rf.pipe(wf)

//fs.createReadStream(process.argv[2]).pipe(process.stdout)

rf.on('data', chunk => process.stdout.write(chunk))
rf.on('error', err => process.stdout.write('ERROR: ' + err.message + '\n'))