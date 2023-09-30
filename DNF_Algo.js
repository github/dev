let arr = [1,2,0,2,1,0,2,0];


function dutchNationalFlag(arr) {
    let low = 0;
    let high = arr.length - 1;
    let i = 0;

    while (i <= high) {
        if (arr[i] === 0) {
            [arr[i], arr[low]] = [arr[low], arr[i]];
            low++;
            i++;
        } else if (arr[i] === 2) {
            [arr[i], arr[high]] = [arr[high], arr[i]];
            high--;
        } else {
            i++;
        }
    }

    return arr;
}

console.log(dutchNationalFlag(arr))

arr = [1,2,0,2,1,0,2,0];

function jatin (arr){
    let i = 0
    let low = 0
    let height = arr.length - 1
    while (i<=height){
        if (arr[i] == 0){
            arr[i],arr[low] = arr[low],arr[i]
            low++
            i++
        }
        else if (arr[i] === 2){
            console.log('2nd',arr[height],arr[i]);
           [arr[i], arr[height]] = [arr[height], arr[i]];
            height--;
        }
        else{i++}
    }
    console.log(arr)
};

jatin(arr)

