(function dutchNationalFlag(arr) {
    arr = [1, 2, 0, 2, 1, 0, 2, 0];
    let i = 0
    let low = 0
    let height = arr.length - 1
    while (i <= height) {
        if (arr[i] == 0) {
            [arr[i], arr[low]] = [arr[low], arr[i]]
            low++
            i++
        }
        else if (arr[i] === 2) {
            [arr[i], arr[height]] = [arr[height], arr[i]];
            height--;
        }
        else { i++ }
    }
    console.log(arr)
})();

// dutchNationalFlag(arr)

