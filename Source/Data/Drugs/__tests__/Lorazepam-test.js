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
  route: 'IV (over 30-60 seconds)',
})

const tests = [
  {
    age: Time.weeks(3),
    tests: [
      {weight: 2.52, expected: undefined},
      {weight: 5.11, expected: undefined},
    ],
  },
  {
    age: Time.months(6),
    tests: [
      {weight: 2.52, expected: Dose('0.25 mg stat')},
      {weight: 5.11, expected: Dose('0.51 mg stat')},
      {weight: 7.77, expected: Dose('0.78 mg stat')},
      {weight: 9.46, expected: Dose('0.95 mg stat')},
    ],
  },
  {
    age: Time.years(2),
    tests: [
      {weight: 14.41, expected: Dose('1.4 mg stat')},
      {weight: 19.54, expected: Dose('2 mg stat')},
      {weight: 20.01, expected: Dose('2 mg stat')},
      {weight: 22.88, expected: Dose('2.3 mg stat')},
      {weight: 41.00, expected: Dose('4 mg stat')}, // not likely!
    ],
  },
]

TestIterators.AgeWeight.OneExpected('Lorazepam', tests)
