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
  route: 'Slow IV (over 3-5 min)',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  1.28, expected:  Dose('19 mg 24 hrly')},
      {weight:  1.81, expected:  Dose('27 mg 24 hrly')},
    ],
  },
  {
    age: Time.months(2),
    tests: [
      {weight:  2.57, expected:  Dose('39 mg 24 hrly')},
      {weight:  3.81, expected:  Dose('57 mg 24 hrly')},
      {weight:  5.15, expected:  Dose('77 mg 24 hrly')},
      {weight:  6.66, expected: Dose('100 mg 24 hrly')},
    ],
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  9.56, expected: Dose('143 mg 24 hrly')},
      {weight: 10.01, expected: Dose('150 mg 24 hrly')},
      {weight: 11.11, expected: Dose('167 mg 24 hrly')},
      {weight: 13.37, expected: Dose('201 mg 24 hrly')},
    ],
  },
  {
    age: Time.years(5),
    tests: [
      {weight: 13.91, expected: Dose('209 mg 24 hrly')},
      {weight: 14.63, expected: Dose('219 mg 24 hrly')},
      {weight: 16.61, expected: Dose('249 mg 24 hrly')},
      {weight: 18.20, expected: Dose('273 mg 24 hrly')},
    ],
  },
  {
    age: Time.years(13),
    tests: [
      {weight: 25.00, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.OneExpected('Amikacin', tests)
