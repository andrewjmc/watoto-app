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
      {weight:  1.98, expected:   Dose('10-20 mg 8 hrly')},
      {weight:  2.01, expected:   Dose('10-20 mg 8 hrly')},
      {weight:  4.44, expected:   Dose('22-44 mg 8 hrly')},
    ],
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  8.25, expected:   Dose('41-83 mg 8 hrly')},
      {weight: 12.75, expected:  Dose('64-128 mg 8 hrly')},
      {weight: 18.33, expected:  Dose('92-183 mg 8 hrly')},
      {weight: 21.50, expected: Dose('108-215 mg 8 hrly')},
    ],
  },
]

TestIterators.AgeWeight.OneExpected('Ibuprofen', tests)
