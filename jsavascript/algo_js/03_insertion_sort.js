// REFRENCES => https://youtu.be/OxUF23k7IcM?list=PLC3y8-rFHvwjPxNAKvZpdnsr41E0fCMMP

// Time Complexity => O^n2

// using for loop and break statement

// let a = [1,20,34,12,45,60,75,50,100,2,79,700,-90]
let a = [-6,20,8]
let n = a.length
for(let i = 1; i < n; i++ ){
    let num = a[i]
    for (let j = i; j >= 0; j--){
        if (a[j-1] > num){
            a[j] = a[j-1]
        }else{
            a[j] = num
            break
        }
    }
}
console.log(a)


// using while loop inside
let a = [1,20,34,12,45,60,75,50,100,2,79,700]
// let a = [-6,20,8]
let n = a.length
for(let i = 1; i < n; i++ ){
    let num = a[i]
    let j = i-1;
    while( j > -1 && a[j] > num ){
            a[j+1] = a[j]
            j--
        }
    a[j+1] = num
}
console.log(a)