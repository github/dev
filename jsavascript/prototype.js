function newUser (score)  {
    this.score = score
    this.printMe =  ()=> {
        console.log(this)
        return 5
    }
}

Array.prototype.printMe = function (){
    console.log(this)
    return 5
}

let a =  new newUser(4)

console.log(a.printMe())