// this question will not work for js this is for java;
var reverseBits = function(n) {
    let res = 0;
    for(let i = 1; i<= 32; i++){
        res = res << 1;
        res = res | (n & 1);
        n = n >> 1;
    }
    return res;
};