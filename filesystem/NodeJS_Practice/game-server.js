const zmq = require('zeromq');
const responder = zmq.socket('rep');

responder.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.range) {
        const range = message.range.split('-').map(Number);
        const answer = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        console.log(`Загаданное число: ${answer}`);
        responder.send(JSON.stringify({ answer }));
    } else if (message.hint === 'more' || message.hint === 'less') {
        console.log(`Подсказка от клиента: ${message.hint}`);
    }
});

responder.bind('tcp://127.0.0.1:5555', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Готов к игре...');
    }
});