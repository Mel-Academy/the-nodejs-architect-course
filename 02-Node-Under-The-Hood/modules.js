// Module.js 
console.log('-- THE HIDDEN ARGUMENTS');

console.log(arguments);
const Calculator = require('./test-module-1');
const calc1 = new Calculator();
console.log(calc1.add(2,5));

const testA = require('./test-module-3');
const testB = require('./test-module-3');
const testc = require('./test-module-3');