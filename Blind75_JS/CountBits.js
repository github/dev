var getNoOfBits = function(n) {
    let count = 0;

    for(let i = 0; i<32;i++){
        let mask = 1 << i;
        if((mask & n) !=0 ){
            count++;
        }
    }
    return count;
};
var countBits = function(n) {
    const arr = new Array(n+1);
    for(let i = 0; i< arr.length; i++){
        arr[i] = getNoOfBits(i);
    }

    return arr;
};