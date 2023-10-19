const net = require('net')
const fs = require('fs')
const targetFile = process.argv[2]
if(!targetFile) throw Error('Не задан файл для наблюдения!')

const server = net.createServer(cnn => {
    console.log('Клиет присоединился!')
    cnn.write(`Начал наблюдение за файлом ${targetFile}`)
    fs.watchFile(targetFile, () => cnn.write(`Файл изменился ${new Date()}\n`))

    cnn.on('close', () => {
        console.log('Клиент отключился!!!')
        fs.unwatchFile(targetFile)
    })
})

server.listen(25556, () => console.log('Сервер запущен...'))