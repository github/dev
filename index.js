
let value1 = "";
let value2 = "";
let operator = "";

function calculate() {
    if (value1 != "" || value2 != "" || operator != "") {

        switch (operator) {
            case "plus":
                console.log("plusss")
                numBox.value = parseInt(value1) + parseInt(value2);
                break;
            case "minus":
                numBox.value = parseInt(value1) - parseInt(value2);
                break;
            case "multiply":
                numBox.value = parseInt(value1) * parseInt(value2);
                break;
            case "divide":
                numBox.value = parseInt(value1) / parseInt(value2);
                break;
            default:
                console.log(error);
        }
    }
}   

function Hello(id) {
   if (isNaN(id)) {
    let numBox = document.getElementById("numBox");
    switch (id) {
        case "ac": 
            value1 = "";
            value2 = "";
            operator = "";
            numBox.value = " ";
            console.log("something");
            break;
        case "plus":
            operator = id;
            numBox.value = "+";
            break;
        case "minus":
            operator = id;
            numBox.value = "+";
            break;
        case "multiply":
            operator = id;
            numBox.value = "×";
            break;
        case "divide":
            operator = id;
            numBox.value = "÷";
            break;
        case "equal":
            calculate();
            break;
        default:
            console("error in switch");
    }

 } else {
    if (operator != "") {
        value2 += id;
        numBox.value = value2;
        console.log(value2);
   } else {
    value1 += id;
    numBox.value = value1;
    console.log(value1);
   }
}
    
}

