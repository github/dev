const util = require('util');

class circularQueue{
    constructor(n){
        this.cQ = new Array(n)
        this.size = n
        this.currIndex = 0
        this.nextIndex = 0
    }
    enqueue(val){
        if(this.nextIndex < this.size && !this.cQ[this.nextIndex]){
            this.cQ[this.nextIndex] = val
            this.nextIndex < this.size-1 ? this.nextIndex++ : this.nextIndex = 0
            return val
        }return false
    }
    dequeue(){
        if(this.cQ[this.currIndex]){
            let temp = this.cQ[this.currIndex]
            this.cQ[this.currIndex] = null
            this.currIndex < this.size-1 ? this.currIndex++ : this.currIndex = 0
            return temp
        }return false
    }
    peek(){
        return this.cQ[this.currIndex]
    }
    reset(){
        this.cQ = new Array(this.size)
    }
    isEmpty(){
        return this.cQ.every(element => element === null);
    }
    [util.inspect.custom]() {
        // Customize the string representation here
        return `CircularQueue: [${this.cQ.join(', ')}]`;
    }
}

let queue = new circularQueue(5);

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.dequeue()
queue.dequeue()
queue.dequeue()
queue.enqueue(4)
queue.enqueue(5)

console.log(queue.isEmpty())
console.log(queue)