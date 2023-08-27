var hammingWeight = function(n) {
    let count = 0;

    for(let i = 0; i<32;i++){
        let mask = 1 << i;
        if((mask & n) !=0 ){
            count++;
        }
    }
    return count;
};