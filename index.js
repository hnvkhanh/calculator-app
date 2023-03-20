var keys = document.querySelectorAll("#key-number");
var operators = document.querySelectorAll("#operator");
let dotKey = document.getElementById("key-dot");
let deleteKey = document.getElementById("key-delete");
let equalSign = document.getElementById("equal-sign");
let resetKey = document.getElementById("reset-calc");
let textOnScreen = document.getElementById("text-on-screen");
let dotKeyClicked = false;
let operatorClicked = false;
let clickedKeys = [];
let currentOperator;
let clickedString = "0";
let inputNum;

function processMath(operator, a, b) {
    switch (operator) {
        case '+':
          return a + b;          
        case '-':
            return a - b;
        case '/':
          return a / b;
        default:
          return a * b;
    }
      
}


keys.forEach((key) =>{
    key.addEventListener("click", () => {
        clickedKeys.push(key.innerHTML);
        clickedString = clickedKeys.reduce((a, b) => {return a + b;});      
        textOnScreen.innerText = clickedString.replace(".", ",");  
    })
})

dotKey.addEventListener("click", () => {
    if (clickedKeys.length > 0 && !dotKeyClicked){
        clickedKeys.push(".");
        dotKeyClicked = true;
        clickedString = clickedKeys.reduce((a, b) => {return a + b;});
        textOnScreen.innerText = clickedString.replace(".", ",");
    }    
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        dotKeyClicked = false;
        if (!operatorClicked){
            inputNum = parseFloat(clickedString);
            currentOperator = operator.innerText;
            clickedString = "";
            clickedKeys = [];
            operatorClicked = true;            
        }
        else{
            inputNum = processMath(currentOperator, inputNum, parseFloat(clickedString))
            clickedString = "";
            clickedKeys = [];
            textOnScreen.innerText = inputNum;
            currentOperator = operator.innerText;
        }        
    });    
});

equalSign.addEventListener("click", () => {
    dotKeyClicked = false;
    if (operatorClicked){
        if (clickedString.length > 0){
            inputNum = processMath(currentOperator, inputNum, parseFloat(clickedString));
            clickedString = inputNum;
        }
        else{
            clickedString = "Invalid value"
        }        
        clickedKeys = [];
        textOnScreen.innerText = clickedString;
        operatorClicked = false;
    }    
});

resetKey.addEventListener("click", () => {
    dotKeyClicked = false;
    clickedString = "0";
    clickedKeys = [];
    currentOperator = undefined;
    operatorClicked = false;
    textOnScreen.innerText = 0;
});

deleteKey.addEventListener("click", () => {
    let deletedKey = clickedKeys.pop();
    if (clickedKeys.length > 0){
        clickedString = clickedKeys.reduce((a, b) => {return a + b;});
    }
    else{
        clickedString = "0";
    }
    if (deleteKey == "."){
        dotKeyClicked = false;
    }
    textOnScreen.innerText = clickedString.replace(".", ",");
})