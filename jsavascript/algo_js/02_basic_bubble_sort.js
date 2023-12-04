let a = [1,20,34,12,45,60,75,50,100,2,79,700]

let swaped = 1
while (swaped != 0)
    {
        swaped = 0;
        // for loop is till -1 because we don't need to compare last element with and out bound element
        for (let i = 0 ; i< a.length-1;i++){
            // let indexOfNum = i+1
            // let currIndex = i
            if (a[i+1] < a[i]){
                // console.log('swapped',a[indexOfNum], a[currIndex]);
                [a[i+1], a[i]] = [a[i],a[i+1]];
                swaped++
            }
        }
        
    }
console.log(a)


// Improved bubble sort => time complexity = O^n2

function bubbleSort(arr) {
    let swapped
    do {
      swapped = false
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i+1], arr[i]] = [arr[i],arr[i+1]];
          swapped = true
        }
      }
    } while (swapped)
  }
  
  const arr = [8, 20, -2, 4, -6]
  bubbleSort(arr)
  console.log(arr) // [-6, -2, 4, 8, 20]