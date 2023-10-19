const net = require('net').connect({port: 25556})
const JMPClient = require('./lib/jmp-client.js').connect(netClient)

JMPClient.on('message', msg => {
    console.log('here')
    switch(msg.type){
        case 'watching': console.log(`Слежу за изменением файла ${msg.file}\n`); break
        case 'changed': console.log(`Файл изменён: ${new Date(msg.timestamp)}\n`); break
        default: console.log(`Неизвестный тип данных: ${msg.type}\n`)
    }
})