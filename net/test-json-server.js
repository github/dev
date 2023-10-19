const net = require('net')
const fs = require('fs')
const targetFile = process.argv[2]
if(!targetFile) throw Error('Не задан файл для наблюдения!')

const server = net.createServer(cnn => {
    console.log('Клиет присоединился!')

    const firstPart = '{"type": "changed", "timesta"}'
    const secondPart = '{}'

    const.write(firstPart)

    cnn.write(firstPart)
    const timer = setTimeout( () => {
        cnn.write(secondPart)
        cnn.end()
    }, 100)

    cnn.on('close', () => {
        console.log('Клиент отключился!!!')
        fs.unwatchFile(targetFile)
    })
})

server.listen(25556, () => console.log('Сервер запущен...'))