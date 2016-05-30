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
  {age:  Time.months(4), expected: undefined},
  {age:  Time.months(6), expected: Dose('200 mg stat')},
  {age:   Time.years(1), expected: Dose('200 mg stat')},
  {age: Time.months(23), expected: Dose('200 mg stat')},
  {age:   Time.years(2), expected: Dose('400 mg stat')},
  {age:   Time.years(4), expected: Dose('400 mg stat')},
  {age:   Time.years(5), expected: Dose('400 mg stat')},
]

TestIterators.Age.OneExpected('Albendazole', tests)
