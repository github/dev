const net = require('net')
const client = net.connect({port: 25556})

client.on('data', data => {
    const msg = JSON.parse(data)
    switch(msg.type){
        case 'watching': console.log(`Слежу за изменением файла ${msg.file}\n`); break
        case 'changed': console.log(`Файл изменён: ${new Date(msg.timestamp)}\n`); break
        default: console.log(`Неизвестный тип данных: ${msg.type}\n`)
    }
})