var calculate = {
  inc: (number) => {
    var inputNumber = number;
    return ++inputNumber;
  },
  dec: (number) => {
    var inputNumber = number;
    return --inputNumber;
  },
  multi: (number, times) => {
    var inputNumber = number;
    return inputNumber * times;
  },
  isEven: (number) => {
    var inputNumber = number;
    return inputNumber % 2 === 0;
  },
  complicated: (number) => {
    var inputNumber = number;

    if (inputNumber < 10) {
      return 'is less';
    }

    var result = {
      inputNumber: inputNumber,
    }

    if (!calculate.isEven(inputNumber)) {
      result.isEven = true;
      result.inc    = calculate.inc(inputNumber); // ++inputNumber;
    } else {
      result.isEven = false;
      result.dec    = calculate.dec(inputNumber);
    }

    var statement = 'is greater';

    if (result.dec < 10) {
      statement = 'is become less';
    }

    return statement;
  }
}
