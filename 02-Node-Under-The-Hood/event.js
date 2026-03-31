const EventEmitter = require('events');
const http = require('http'); // We'll use this for the final proof 


const myEmitter = new EventEmitter();
myEmitter.on('newSale', () => {
    console.log('Observer 1: Sale detected! Updating the Dashboard...');
});

myEmitter.on('newSale', () => {
    console.log('Observer 2: Successs! Sending cofirmation email...');
});

myEmitter.on('newSale', (stock) => {
    console.log(`Observer 3: Inventory adjusted. ${stock} items remaining.`);
});

console.log('--- Action: A customer clicks "Buy Now"---');
myEmitter.emit('newSale', 9)

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const customEmitter = new Sales()

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Signal Caught! request at: ' + req.url);
    res.end('The Event-Driven server says Hello!')
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for signals on Port 8000');
});