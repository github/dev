let a  = [1,2,3,4,5,10,30,500]

function binarySearch(arr,target){
    
    while (arr.length > 0){

        // initialize num as centeral number
        let num = arr[parseInt(arr.length/2)]

        // if num == target value return num
        if (target === num) return num

        // if target is less than num go to the left half of the array and remove the right half
        else if (target < num){
            arr.splice(arr.indexOf(num))
        }else {
            arr.splice(0,arr.indexOf(num))
        }
        console.log(arr)
    }
    return -1
}

console.log(binarySearch(a,500))
