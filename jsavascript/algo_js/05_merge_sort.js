// Time Complexity O(NlogN)

function mergeSort(arr){
    let n = arr.length
    if (n <= 1){
        return arr
    }
    let middle = Math.floor(n/2)
    let leftArr = arr.slice(0,middle)
    let rightArr = arr.slice(middle)
    
    return merge(mergeSort(leftArr),mergeSort(rightArr))
}

function merge(lArr,rArr){
    let sortedArr = []
    while (lArr.length && rArr.length){
        if (lArr[0] > rArr[0]){
            sortedArr.push(rArr.shift())
        }else{
            sortedArr.push(lArr.shift())
        }
    }
    return [...sortedArr,...lArr,...rArr]
}

let a = [5,4,3,2,1,90,-90,100,40]

console.log(mergeSort(a))