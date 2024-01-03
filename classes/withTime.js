const EventEmitter = require('../classes/eventEmitter');

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
      this.emit('begin');
  
      const startTime = new Date().getTime();
      const result = await asyncFunc(...args);
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
  
      this.emit('data', result);
      console.log('Data:', result);
      this.emit('end');
  
      console.log('Time taken:', timeTaken, 'ms');
    }
}

module.exports = WithTime;