//  Needs babel to run this code and make it pure js in runtime
function locked(target, key, descriptor) {
    return {
        ...descriptor,
        writable: false,
    };
}

class Data {
    @locked
    password = 'jatin123';
}

let x = new Data();


x.password = 'jatin'

console.log(x.password)