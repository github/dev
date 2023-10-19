const { error } = require('console')

const EventEmitter = require('events').EventEmitter

class JMPClient extends EventEmitter {
    constructor(stream){
        super()
        let buffer = ''
        stream.on('data', data => {
            buffer += data
            let boundary = buffer.indexOf('\n')
            while(boundary !== -1){
                const input = buffer.substring(0, boundary)
                buffer = buffer.substring(0, boundary+1)
                this.emit('message', JSON.parse(input))
                boundary = buffer.indexOf('\n')
            }
        })
    }
    static connect(stream){
        return new JMPClient(stream)
    }
}
module.exports = JMPClient

/*const net = require('net').connect({port: 25556})
 V1
const client = new require('....')(net)
 V2
const clinet = require('....').connect(net)
clinet.on('message', message => {})*/