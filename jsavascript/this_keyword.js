
let user = {
    username : 'jatin',
    greet : function  ()  {
        console.log(`welcome : ${this.username}`)
    }
}

user.greet() // print welcome jatin



let user = {
    username : 'jatin',
    greet : () =>  {
        console.log(`welcome : ${this.username}`)
    }
}

user.greet() // print welcome undefined