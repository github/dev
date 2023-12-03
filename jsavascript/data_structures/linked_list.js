
class Node {
    constructor (val){
        this.node = val
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }
    
    isEmpty(){
        return this.size === 0
    }
    
    prepend(val){
        if(this.isEmpty()){
            const node = new Node(val)
            this.head = node
            this.tail = node
        }else{
            const node = new Node(val)
            node.next = this.head
            this.head = node
        }
        this.size++
        return this.head
    }
    
    append(val){
        if(this.isEmpty()){
            const node = new Node(val)
            this.head = node
            this.tail = node
        }else{
        const node = new Node(val)
        this.tail.next = node
        this.tail = node
        }
        this.size++
        return this.head
    }
    
    insertNode(val,index){
        if (index > this.size || index < 0){
            return 'Index Out of Range'
        }else{
            let loopIndex = 0
            let node = this.head
            while (node){
                if (loopIndex == index-1){
                    let newNode = new Node(val)
                    let temp = node.next
                    node.next = newNode
                    newNode.next = temp
                    // update the tail info if adding element in last
                    if (loopIndex == this.size-1){
                        this.tail = newNode
                    }
                    this.size++
                    return 'Node inserted successfully'
                }else{
                    node = node.next
                    loopIndex++
                }
            }
            return 'Unable to insert Node'
        }
    }
    
    findNode(val){
        let node = this.head
        let index = 0
        while (node){
            if (node.node == val){
                return `index of ${val} is ${index}`
            }else{
                node = node.next
                index++
            }
        }
        return 'Value not found'
    }
    
    deleteNode(val){
        if (this.isEmpty()){
            return 'cannot delete from empty list'
        }else if(this.head.node === val){
            this.head = this.head.next
            this.size--
            return 'delete operation successfull'
        }
        let node = this.head
        while (node.next){
            if (node.next.node === val){
                let temp = node.next.next
                node.next = temp
                this.size--
                // changing til if removed value is tail
                if(temp === null){
                    console.log('changing tail value')
                    this.tail = node
                }
                return 'delete operation successful'
            }else{
                node = node.next
            }
        }
        return 'unable to delete node'
    }

    removeFromFront(){
        if(!this.isEmpty()){
            val = this.head.node
            this.head = this.head.next
            this.size--
            return val
        }
    }
    
    reverse(){
        let [prev,curr,newHead] = [null,this.head,this.head]
        this.tail = this.head
        
        while (newHead){
            newHead = newHead.next
            curr.next = prev
            prev = curr
            curr = newHead
        }
        this.tail.next = null
        this.head = prev
    }
    
    printList(){
        if(this.isEmpty()){
            return 'List is Empty'
        }
        let list = []
        let node = this.head
        while (node){
            list.push(node.node)
            node = node.next
        }
        return list
    }
}


ll = new LinkedList()

// console.log(ll.isEmpty())
// console.log(ll.prepend(1))
// console.log(ll.prepend(2))
// console.log(ll.append(3))
// console.log(ll.append(5))
// console.log(ll.prepend(4))
// console.log(ll.insertNode(10,3))
// console.log('===================================')
// console.log(ll.findNode(2))
// console.log(ll.printList())
// console.log(ll.tail)
// console.log(ll.deleteNode(40))
// console.log(ll.tail)
// console.log(ll.append(30))
// console.log(ll.printList())

