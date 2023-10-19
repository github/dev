const fs = require('fs')
const spawn = require('child_process').spawn

const targetFile = process.argv[2]
if(!targetFile) throw Error('Не задан файл для наблюдения!')

fs.watchFile(targetFile, () => {
    const ls = spawn('ls', ['-l', targetFile])
    ls.stdout.pipe(process.stdout)
})

console.log(`Начал наблюдение за файлом ${targetFile}`)