var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('calculator functionality', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:3000');
  });

  // write integration tests here in the form of "it should do something..."
  it('should have working number buttons', function(){
    running_total = element(by.css('#running_total'))
    element(by.css('#number2')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('2')
  })


  //   - Do the number buttons work to update the display of the running total?
  it('should have working number buttons', function () {
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('100')
  })

  //   - Do each of the arithmetical operations work to update the display with the result of the operation?
  it('should multiply 10x10 and get 100', function () {
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_multiply')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('100')
  })

  it('should divide 100 by 10 and get 10', function () {
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_divide')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('10')
  })

  it('should add 10+10 and get 20', function () {
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_add')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('20')
  })

  it('should subtract 10-10 and get 0', function () {
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_subtract')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('0')
  })

  //   - Can we chain multiple operations together?
  it('should calculate 10*10+10-10 and get 100', function () {
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_multiply')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_add')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_subtract')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('100')
  })

  //   - Does it work as expected for a range of numbers? (positive, negative, decimals, very large numbers)

  it('should calculate 1000000+1000000 and get 2000000', function () {
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_add')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('2000000')
  })

  it('should calculate 1000000-1000001 and get -1', function () {
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_subtract')).click()
    element(by.css('#number1')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number0')).click()
    element(by.css('#number1')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('-1')
  })

  it('should calculate 7/2 and get 3.5', function () {
    element(by.css('#number7')).click()
    element(by.css('#operator_divide')).click()
    element(by.css('#number2')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('3.5')
  })

  // What does the code do in exceptional circumstances?
  //
  //   - If you divide by zero, what is the effect?
  //   - Can you write a test to describe what you'd prefer to happen, and then correct the code to make that test pass.



  // it('should divide 1 by 0 and get Infinity', function () {
  //   element(by.css('#number1')).click()
  //   element(by.css('#operator_divide')).click()
  //   element(by.css('#number0')).click()
  //   element(by.css('#operator_equals')).click()
  //   expect(running_total.getAttribute('value')).to.eventually.equal('Infinity')
  // })

  it('should divide 1 by 0 and get Undefined', function () {
    element(by.css('#number1')).click()
    element(by.css('#operator_divide')).click()
    element(by.css('#number0')).click()
    element(by.css('#operator_equals')).click()
    expect(running_total.getAttribute('value')).to.eventually.equal('Undefined')
  })
});
