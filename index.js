var keys = document.querySelectorAll("#key-number");
var operators = document.querySelectorAll("#operator");
var toggleBtns = document.querySelectorAll("#toggle-btn");
let bodyElement = document.querySelector("body");
let dotKey = document.getElementById("key-dot");
let deleteKey = document.getElementById("key-delete");
let equalSign = document.getElementById("equal-sign");
let resetKey = document.getElementById("reset-calc");
let textOnScreen = document.getElementById("text-on-screen");
let startFontSize = parseFloat(window.getComputedStyle(textOnScreen, null).getPropertyValue('font-size'));
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

function adjustText(textOnScreen) {
    let adjustPara = Math.floor(textOnScreen.innerText.length / 8);    
    textOnScreen.style.fontSize = (startFontSize * Math.pow(0.7, adjustPara)).toString() + "px";    
}

keys.forEach((key) =>{
    key.addEventListener("click", () => {
        clickedKeys.push(key.innerHTML);
        clickedString = clickedKeys.reduce((a, b) => {return a + b;});            
        textOnScreen.innerText = clickedString.replace(".", ",");  
        adjustText(textOnScreen);  
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
            if (clickedString.length > 0){
                inputNum = processMath(currentOperator, inputNum, parseFloat(clickedString));
                inputNum = Math.round(inputNum * 10000000) / 10000000;
                clickedString = "";
                clickedKeys = [];                
                textOnScreen.innerText = inputNum.toString().replace(".", ",");
                adjustText(textOnScreen);
                currentOperator = operator.innerText;
            }
            else{
                currentOperator = operator.innerText;
            }            
        }        
    });    
});

equalSign.addEventListener("click", () => {
    dotKeyClicked = false;
    if (operatorClicked){
        if (clickedString.length > 0){
            inputNum = processMath(currentOperator, inputNum, parseFloat(clickedString));
            inputNum = Math.round(inputNum * 10000000) / 10000000;
            clickedString = inputNum.toString();
        }
        else{
            clickedString = "Invalid value"
        }        
        clickedKeys = [];                
        textOnScreen.innerText = clickedString.replace(".", ",");
        adjustText(textOnScreen);
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
    adjustText(textOnScreen);
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
    adjustText(textOnScreen);
});


toggleBtns.forEach((btn) => {    
    btn.addEventListener("click", () =>{
        let onClickBtn = parseInt(btn.innerHTML);
        let nextTheme = (onClickBtn % 3 + 1).toString();
        btn.hidden = true;        
        toggleBtns[parseInt(nextTheme) - 1].hidden = false;             
        bodyElement.classList = [];
        bodyElement.classList.add("theme-" + nextTheme);              
    });
});