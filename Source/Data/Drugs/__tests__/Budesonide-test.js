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
  route: 'Inhaler via Spacer',
})

const tests = [
  {age: Time.months(11), expected: undefined},
  {age:   Time.years(1), expected: Dose('200 micrograms 24 hrly')},
  {age: Time.months(36), expected: Dose('200 micrograms 24 hrly')},
]

TestIterators.Age.OneExpected('Budesonide', tests)
