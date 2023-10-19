const net = require('net')
const fs = require('fs')
const targetFile = process.argv[2]
if(!targetFile) throw Error('Не задан файл для наблюдения!')

const server = net.createServer(cnn => {
    console.log('Клиет присоединился!')

    let json = JSON.stringify({type: 'watching', file: targetFile})
    cnn.write(json + '\n')

    json = JSON.stringify({type: 'changed', timestamp: Date.now()})
    fs.watchFile(targetFile, () => cnn.write(json + '\n'))

    cnn.on('close', () => {
        console.log('Клиент отключился!!!')
        fs.unwatchFile(targetFile)
    })
})

server.listen(25556, () => console.log('Сервер запущен...'))