
// Time Complexities
// Worst Case O N^2
// Avg Case O NlogN

let a = [400,2,33,1,6,45,12,-90,100];

function quickSort(arr,n){
    if (n <= 1){
        return arr
    }
    let rightArr = [];
    let leftArr = [];
    let pivot = arr[n-1]

    for (let i = 0; i < n-1; i++){
        if(arr[i] > pivot){
            rightArr.push(arr[i])
        }else{
            leftArr.push(arr[i])
        }
    }
    // console.log(leftArr,rightArr,pivot)
    return ([...quickSort(leftArr,leftArr.length),pivot,...quickSort(rightArr,rightArr.length)])
}

console.log(quickSort(a,a.length))