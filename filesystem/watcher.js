const fs = require('fs')

fs.watchFile('target.txt', () => console.log('Файл изменился'))

console.log('Наблюдаю за файлом target.txt')