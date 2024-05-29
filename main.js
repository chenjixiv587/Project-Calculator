const calculate = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    '*': (a, b) => a * b,
    "/": (a, b) => {
        if (b === 0) {
            return "oops";
        } else {
            return (a / b);
        }
    },
}

let operandOne = 0;
let operator = "";
let operandTwo = 0;

const operate = (operandOne, operator, operandTwo) => {
    return calculate[operator](operandOne, operandTwo);
}

const digits = document.querySelectorAll(".operand");
const display = document.querySelector(".display");
const equalOperate = document.querySelector("#equal");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const percent = document.querySelector("#percent");
const posOrNeg = document.querySelector("#posOrNeg");
const backSpace = document.querySelector("#back");
let flag = true;

let secondCount = 0;
const getNum = (e) => {
    let currentOperand = 0;
    if (flag) display.textContent = "";
    flag = false;

    display.textContent += e.target.textContent;
    currentOperand = +display.textContent;
    return currentOperand;
};
const getOperator = e => {
    operator = e.target.textContent;
};

[...operators].forEach(op => {
    op.addEventListener("click", getOperator)
});

[...digits].forEach(digit => digit.addEventListener("click", e => {

    if (operator) {
        if (secondCount === 0) {
            flag = true;
            secondCount++;
        }
        operandTwo = getNum(e);

    } else {
        operandOne = getNum(e);
    }
}));

equalOperate.addEventListener("click", e => {
    if (!operator) {
        operate(0, "+", 0);
    }
    else {
        flag = false;
        let res = operate(operandOne, operator, operandTwo);
        display.textContent = res;
        operandOne = +res;
        flag = true;
        secondCount = 0;
        operandTwo = 0;
    }

});


clear.addEventListener("click", e => {
    display.textContent = "0";
    operandOne = 0;
    operandTwo = 0;
    operator = "";
    flag = true;
    secondCount = 0;
});

percent.addEventListener("click", e => {
    if (!operator) {
        display.textContent = (+display.textContent) / 100;
        operandOne = (+display.textContent);
    }
    else {
        display.textContent = (+display.textContent) / 100;
        operandTwo = (+display.textContent);
    }
});

posOrNeg.addEventListener("click", e => {
    if (!operator) {
        display.textContent = "-" + display.textContent;
        operandOne = display.textContent * 1;
    }
    else {
        display.textContent = "-" + display.textContent;
        operandTwo = display.textContent * 1;
    }
});

backSpace.addEventListener("click", e => {
    display.textContent = display.textContent.slice(0, -1);
    if (!operator) {
        operandOne = +display.textContent;
    }
    else {
        operandTwo = +display.textContent;
    }

    if (+display.textContent === 0) {
        display.textContent = "0";
    }
});