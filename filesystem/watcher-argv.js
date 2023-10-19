const fs = require('fs')

const targetFile = process.argv[2]
if(!targetFile) throw Error('Не задан файл для наблюдения!')

fs.watchFile(targetFile, () => console.log(`Внимание файл ${targetFile} изменился!!!`))

console.log(`Начал наблюдение за файлом ${targetFile}`)