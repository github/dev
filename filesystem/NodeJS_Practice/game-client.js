const fs = require('fs');
const zmq = require('zeromq');
const requester = zmq.socket('req');

const range = process.argv.slice(2).map(Number);
const min = Math.min(...range);
const max = Math.max(...range);

const logFilePath = 'client-log.txt';

function log(message) {
    console.log(message);
    fs.appendFileSync(logFilePath, message + '\n', 'utf8');
}

requester.connect('tcp://127.0.0.1:5555');
requester.send(JSON.stringify({ range: `${min}-${max}` }));

requester.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.answer !== undefined) {
        const guess = message.answer;
        log(`Клиент угадал число: ${guess}`);

        if (guess < max) {
            log('Подсказка: Больше');
            requester.send(JSON.stringify({ hint: 'more' }));
        } else if (guess > min) {
            log('Подсказка: Меньше');
            requester.send(JSON.stringify({ hint: 'less' }));
        } else {
            log('Загаданное число было угадано!');
            requester.close();
        }
    }
});

process.on('SIGINT', () => {
    requester.close();
    process.exit();
});
