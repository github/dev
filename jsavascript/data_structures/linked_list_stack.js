class LinkedListStack{
    constructor(){
        this.list = new LinkedList()
    }
    
    push(val){
        this.list.prepend(val)
    }
    
    pop(){
       this.list.removeFromFront() 
    }
    
    peek(){
        return this.list.head.node
    }
    
    isEmpty(){
        return this.list.isEmpty()
    }
    
    getSize(){
        return this.list.size
    }
    
    print(){
        this.list.printList()
    }
}