
class EventEmitter {
    listeners = {};
   
    addListener(eventName, fn) {
        if(!this.listeners[eventName]){
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(fn);
    }
      
    on(eventName, fn) {
        this.addListener(eventName, fn);
    }
   
    removeListener(eventName, fn) {
        const eventListeners = this.listeners[eventName];
        if(eventListeners){
            const index = eventListeners.indexOf(fn);
            if(index !== -1){
                eventListeners.splice(index, 1);
            }
        }
    }
      
    off(eventName, fn) {
        this.removeListener(eventName, fn);
    }
   
    once(eventName, fn) {
        const onceWrapper = (...args) =>{
            fn(...args);
            this.removeListener(eventName, onceWrapper);
        }
        this.addListener(eventName, onceWrapper);
    }
   
    emit(eventName, ...args) {
        const eventListeners = this.listeners[eventName];
        if(eventListeners){
            eventListeners.forEach(fn => fn(...args));
        }
    }
   
    listenerCount(eventName) {
        const eventListeners = this.listeners[eventName];
        return eventListeners ? eventListeners.length : 0;
    }
   
    rawListeners(eventName) {
        return this.listeners[eventName] || [];
    }
}

module.exports = EventEmitter;