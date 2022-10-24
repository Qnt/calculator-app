const numberButtons = document.querySelectorAll('.key-number');
const operatorButtons = document.querySelectorAll('.key-operator');
const calculateButton = document.querySelector('.key-equal');
const deleteButton = document.querySelector('.key-delete');
const resetButton = document.querySelector('.key-reset');
const screenElement = document.querySelector('.screen-output');


class Calculator {
  constructor(prevValue, currentValue) {
    this.prevValue = prevValue.toString();
    this.currentValue = currentValue.toString();
    this.result;
    this.operator;
  }
  
  appendDigit = (digitToAdd) => {
    if (digitToAdd === '.' && this.currentValue.includes('.')) return;
    if (this.currentValue === '0' && digitToAdd !== '.' || this.operator === undefined) {
      this.currentValue = digitToAdd.toString();
    } else {
      this.currentValue += digitToAdd.toString();
    }
  };

  chooseOperator = (operator) => {
    if (this.operator !== undefined) {
      this.calculate();
    }
    this.operator = operator;
    if (this.currentValue !== '') {
      this.prevValue = this.currentValue;
    } else {
      this.prevValue = this.result;
    }
    this.currentValue = '';
  }

  calculate = () => {
    if (this.currentValue === '') {
      this.currentValue = this.prevValue;
    }
    if (this.operator !== undefined) {
      switch(this.operator) {
        case '+': this.result = parseFloat(this.prevValue) + parseFloat(this.currentValue); break;
        case '-': this.result = parseFloat(this.prevValue) - parseFloat(this.currentValue); break;
        case 'x': this.result = parseFloat(this.prevValue) * parseFloat(this.currentValue); break;
        case '/': this.result = parseFloat(this.prevValue) / parseFloat(this.currentValue); break;
      }
      this.currentValue = '';
      this.prevValue = this.result;
      this.operator = undefined;
    } else {
      this.result = this.currentValue;
    }
  }

  resetValues = () => {
    this.currentValue = '';
    this.prevValue = '0';
    this.operator = undefined;
    this.result = undefined;
  }

  deleteCurrentValue = () => {
    this.currentValue = '';
  }

  display = () => {
    let displayValue = this.currentValue;
    if (this.currentValue === '') {
      displayValue = this.result;
      if(this.result === undefined){
        displayValue = '0';
      }
    }
    screenElement.textContent = displayValue;
  }
}

const calculator = new Calculator(0, 0);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendDigit(button.textContent);
    calculator.display();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.textContent);
    calculator.display();
  });
});

calculateButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.display();
});

deleteButton.addEventListener('click', () => {
  calculator.deleteCurrentValue();
  calculator.display();
})

resetButton.addEventListener('click', () => {
  calculator.resetValues();
  calculator.display();
})