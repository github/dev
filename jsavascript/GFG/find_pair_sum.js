// https://practice.geeksforgeeks.org/problems/pair-with-given-sum-in-a-sorted-array4940/1



function Countpair(arr, n, k) {
    let start = arr[0]
    let i = 0
    n = n--
    let end = arr[arr.length-1]
    
    let count = 0
    while (start < end){
        let target = start+end
        if(target === k){
            count++
            i++
            start = arr[i]
            n--
            end = arr[n]
        }
        else if (target < k){
            i++
            start = arr[i]
        }
        else{
            n--
            end = arr[n]
        }
    }
    return count > 0 ? count : -1
  }