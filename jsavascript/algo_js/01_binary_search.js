function binarySearch(arr,target){
    
    // initialize num as centeral number
    let num = arr[parseInt(arr.length/2)]
    
    // run loop until find lenght of array is grater than 1
    while (arr.length > 1){
        // if num == target value return num
        if (target === num) return num
        // if target is less than num 
        if (target < num){
            arr.splice(arr.indexOf(num))
            num = arr[parseInt(arr.length/2)]
        }
        if (target > num) {
            arr.splice(0,arr.indexOf(num))
            num = arr[parseInt(arr.length/2)]
        }
        console.log(arr)
    }
    return -1
}

let a  = [1,2,3,4,5,10,30,100]

console.log(binarySearch(a,10));