let a  = [1,2,3,4,5,10,30,500]

function binarySearch(arr,target){
    
    // initialize num as centeral number
    let num = arr[parseInt(arr.length/2)]
    // console.log(num,arr)
    
    // run loop until find lenght of array is grater than 1
    while (arr.length > 0){
        // if num == target value return num
        if (target === num) return num
        // if target is less than num go to the left half of the array and remove the right half
        if (target < num){
            arr.splice(arr.indexOf(num))
            // update the value of num with new center point on array
            num = arr[parseInt(arr.length/2)]
        }
        // vice versa
        if (target > num) {
            arr.splice(0,arr.indexOf(num))
            num = arr[parseInt(arr.length/2)]
        }
        console.log(arr)
    }
    return -1
}

console.log(binarySearch(a,500))
