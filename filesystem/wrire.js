const fs = require('fs')

fs.writeFile('target.txt', 'Hello, world!', err => {
    if (err) throw err
    console.log('Данные записанны в файл')
})

console.log('Пишем в файл ' + targetFile)