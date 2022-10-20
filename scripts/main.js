const numberButtons = document.querySelectorAll('.key-number');
const operatorButtons = document.querySelectorAll('.key-operator');
const calculateButton = document.querySelector('.key-equal');
const deleteButton = document.querySelector('.key-delete');
const resetButton = document.querySelector('.key-reset');
const screenElement = document.querySelector('.screen-output');


class Calculator {
  constructor(prevValue, currentValue) {
    this.prevValue = prevValue;
    this.currentValue = currentValue;
    this.result;
    this.operator;
  }
  
  appendDigit = (digitToAdd) => {
    if (digitToAdd === '.' && this.currentValue.includes('.')) return;
    this.currentValue += digitToAdd.toString();
    if (this.currentValue[0] === '0' && this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(1);
    }
  };

  chooseOperator = (operator) => {
    if (this.operator !== undefined) {
      this.calculate();
    }
    this.operator = operator;
    this.prevValue = this.currentValue;
    this.currentValue = '';
  }

  calculate = () => {
    switch(this.operator) {
      case '+': this.result = parseFloat(this.prevValue) + parseFloat(this.currentValue); break;
      case '-': this.result = parseFloat(this.prevValue) - parseFloat(this.currentValue); break;
      case 'x': this.result = parseFloat(this.prevValue) * parseFloat(this.currentValue); break;
      case '/': this.result = parseFloat(this.prevValue) / parseFloat(this.currentValue); break;
    }
    this.currentValue = this.result;
    this.prevValue = '';
    this.operator = undefined;
  }

  resetValues = () => {
    this.currentValue = '';
    this.prevValue = '';
    this.operator = undefined;
    this.result = undefined;
  }

  deleteCurrentValue = () => {
    this.currentValue = '';
  }

  display = () => {
    if (this.result !== undefined) {
      screenElement.textContent = this.result;
    }
    if (this.currentValue !== '') {
      screenElement.textContent = this.currentValue;
    } else {
      screenElement.textContent = this.prevValue;
    }
  }
}

const calculator = new Calculator(0, 0);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendDigit(button.textContent);
    calculator.display();
    console.log(`prev: ${calculator.prevValue} oper: ${calculator.operator} cur: ${calculator.currentValue} res: ${calculator.result}`);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.textContent);
    calculator.display();
    console.log(`prev: ${calculator.prevValue} oper: ${calculator.operator} cur: ${calculator.currentValue} res: ${calculator.result}`);
  });
});

calculateButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.display();
  console.log(`prev: ${calculator.prevValue} oper: ${calculator.operator} cur: ${calculator.currentValue} res: ${calculator.result}`);
});

deleteButton.addEventListener('click', () => {
  calculator.deleteCurrentValue();
  calculator.display();
})

resetButton.addEventListener('click', () => {
  calculator.resetValues();
  calculator.display();
})