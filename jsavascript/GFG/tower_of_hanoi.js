// Tower of hanoi problem link => https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/

// The idea is to use the helper node to reach the destination using recursion. Below is the pattern for this problem:

//     Shift 'N-1' disks from 'A' to 'B', using C.
//     Shift last disk from 'A' to 'C'.
//     Shift 'N-1' disks from 'B' to 'C', using A.


function TOH(n,currNode,auxNode,destNode){
    if (n <= 1){
        console.log(`moved ${n} from ${currNode} to ${destNode}`)
        return
    }
    TOH(n-1,currNode,destNode,auxNode)
    console.log(`moved ${n} from ${currNode} to ${destNode}`)
    TOH(n-1,auxNode,currNode,destNode)
}

TOH(3,1,2,3)