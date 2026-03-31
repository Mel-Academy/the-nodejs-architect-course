const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

console.log('1. Hello from the top-level!');

setTimeout(() => console.log('2. Timer 1 finished'), 0);
setImmediate(() => console.log('3. Immediate 1 finished '));

console.log('4. Hello from the END of the top Level');

fs.readFile('test-file.txt', () => {
    console.log('---ENTWRING I/O CALLBACK ---');

    // These are now being scheduled from the polling phase 
    setTimeout(() => console.log('5. Timer 2 finished'), 0);
    setTimeout(() => console.log('6. Timer 3 finished (3s)'), 3000);
    setImmediate(() => console.log('7. Immediate 2 finished'));

    // VIP Lane
    process.nextTick(() => console.log('8. nextTick: The VIP Lane'));
});

crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'ms | 9. Password 1 encrypted');
});
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'ms | 10. Password 2 encrypted');
});



