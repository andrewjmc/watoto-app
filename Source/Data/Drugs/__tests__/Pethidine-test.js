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
  route: 'IM',
})

const tests = [
  {
    age: Time.weeks(3),
    tests: [
      {weight: 0.52, expected: undefined},
      {weight: 2.11, expected: undefined},
      {weight: 3.22, expected: undefined},
    ],
  },
  {
    age: Time.months(1),
    tests: [
      {weight:  1.98, expected:  Dose('0.99-2 mg 4-6 hrly')},
      {weight:  2.01, expected:   Dose('1-2 mg 4-6 hrly')},
      {weight:  4.44, expected:   Dose('2.2-4.4 mg 4-6 hrly')},
    ],
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  8.25, expected:   Dose('4.1-8.3 mg 4-6 hrly')},
      {weight: 12.75, expected:  Dose('6.4-12.8 mg 4-6 hrly')},
      {weight: 18.33, expected:  Dose('9.2-18.3 mg 4-6 hrly')},
      {weight: 21.50, expected: Dose('10.8-21.5 mg 4-6 hrly')},
    ],
  },
]

TestIterators.AgeWeight.OneExpected('Pethidine', tests)
