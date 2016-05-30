'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const Dose = DrugDose.template({
  route: 'PO',
})

const tests = [
  {age:   Time.weeks(4), expected:  Dose('50,000 u stat')},
  {age:  Time.months(2), expected:  Dose('50,000 u stat')},
  {age:  Time.months(7), expected: Dose('100,000 u stat')},
  {age:   Time.years(1), expected: Dose('100,000 u stat')},
  {age: Time.months(13), expected: Dose('200,000 u stat')},
  {age:   Time.years(3), expected: Dose('200,000 u stat')},
]

TestIterators.Age.OneExpected('VitaminA', tests)
