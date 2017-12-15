var Calculator = require('../../public/js/calculator.js')
var assert = require('assert')

describe('calculator', function () {
  beforeEach(function () {
    calculator = new Calculator()
  });

  calculator.numberClick()
  calculator.operatorClick()
  calculator.clearClick()

  multiply 3x5 and get 15
  divide 21/7 and get 3
  add 1+4 and get 5
  subtract 7-4 and get 3
  concatenate multiple number button clicks
  chain multiple operations together
  clear the running total without affecting the calculation

  // write unit tests here in the form of "it should do something..."
  it('it recognizes a numberClick', function(){
    assert.equal(true, true)
  }),

  it('it can add', function(){
    assert.equal(calculator.add(1+4), 5)
  }),

  it('it can subtract', function(){
    assert.equal(calculator.subtract(7-4), 3)
  }),

  it('it can multiply', function(){
    assert.equal(calculator.multiply(3*5), 15)
  }),

  it('it can divide', function(){
    assert.equal(calculator(21/7), 3)
  }),



});
