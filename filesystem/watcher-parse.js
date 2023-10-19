const fs = require('fs')
const { json } = require('stream/consumers')
const spawn = require('child_process').spawn

const targetFile = process.argv[2]
if(!targetFile) throw Error('Не задан файл для наблюдения!')

fs.watchFile(targetFile, () => {
    const ls = spawn('ls', ['-l', targetFile])
    let output = ''
    ls.stdout.on('data', chunk => output += chunk)
    ls.on('close', () => {
        const parts = output.split(/\s+/)
        output = `\nФайл ${targetFile} изменён ${parts[6]} ${parts[5]} в ${parts[7]}.\nНовый размер файла: ${parts[4]} байта`
        process.stdout.write(output)
    })
})

process.stdout.write(`Начал наблюдение за файлом ${targetFile}`)