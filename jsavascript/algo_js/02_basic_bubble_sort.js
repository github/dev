let a = [1,20,34,12,45,60,75,50,100,2,79,700]

let swaped = 1
while (swaped != 0)
    {
        swaped = 0;
        for (let i = 0 ; i< a.length;i++){
            let indexOfNum = i+1
            let currIndex = i
            if (a[i+1] < a[i]){
                // console.log('swapped',a[indexOfNum], a[currIndex]);
                [a[i+1], a[i]] = [a[i],a[i+1]];
                swaped++
            }
        }
        
    }
console.log(a)