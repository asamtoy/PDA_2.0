var Calculator = require('../../public/js/calculator.js')
var assert = require('assert')

describe('calculator', function () {
  beforeEach(function () {
    calculator = new Calculator()
  });

  // write unit tests here in the form of "it should do something..."
  it('it has a sample test', function(){
    assert.equal(true, true)
  })

  //  - calculator.add()
  it('it can add', function(){
    calculator.previousTotal = 3
    calculator.add(5)
    assert.equal(calculator.runningTotal, 8)
  })

  // - calculator.subtract()
  it('it can subtract', function(){
    calculator.previousTotal = 100
    calculator.subtract(5)
    assert.equal(calculator.runningTotal, 95)
  })

  // - calculator.multiply()
  it('it can multiply', function(){
    calculator.previousTotal = 5
    calculator.multiply(5)
    assert.equal(calculator.runningTotal, 25)
  })

  // - calculator.divide()
  it('it can divide', function(){
    calculator.previousTotal = 9
    calculator.divide(3)
    assert.equal(calculator.runningTotal, 3)
  })

  // - calculator.numberClick()
  it('it can register a numberclick', function(){
    calculator.numberClick(5)
    assert.equal(calculator.runningTotal, 5)
  })

  // - calculator.operatorClick()
  it('it can register an operator click', function() {

      calculator.numberClick(7)
      calculator.operatorClick("-")
      calculator.numberClick(4)
      calculator.operatorClick("=")

      assert.equal(3, calculator.runningTotal)
    });

  // - calculator.clearClick()
  it('it can register a clear click', function() {

      calculator.numberClick(7)
      calculator.operatorClick("-")
      calculator.numberClick(4)
      calculator.clearClick()
      calculator.numberClick(9)
      calculator.operatorClick("=")

      assert.equal(-2, calculator.runningTotal)
    });


});
