const fs = require('fs')

const targetFile = process.argv[2]
if(!targetFile) throw Error('Не задан файл для наблюдения!')

fs.readFile('target.txt', (err, data) => {
    if (err) throw err
    process.stdout.write('\n' + data.toString() + '\n\n')
})

const data = fs.readFileSync(targetFile)
console.log(data.toString())

process.stdout.write('\nЧитаем файл ' + targetFile)