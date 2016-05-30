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
  route: 'IV / IM',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  0.63, expected:  Dose('32 mg 12 hrly')},
      {weight:  1.01, expected:  Dose('51 mg 12 hrly')},
      {weight:  1.50, expected:  Dose('75 mg 12 hrly')},
      {weight:  2.11, expected: Dose('106 mg 12 hrly')},
    ],
  },
  {
    age: Time.weeks(1),
    tests: [
      {weight:  0.84, expected:  Dose('42 mg 12 hrly')},
      {weight:  1.78, expected:  Dose('89 mg 12 hrly')},
      {weight:  2.31, expected: Dose('116 mg 12 hrly')},
    ],
  },
  {
    age: Time.days(8),
    tests: [
      {weight:  1.66, expected:  Dose('83 mg 8 hrly')},
      {weight:  1.81, expected:  Dose('91 mg 8 hrly')},
      {weight:  2.72, expected: Dose('136 mg 8 hrly')},
    ],
  },
  {
    age: Time.weeks(4),
    tests: [
      {weight:  0.63, expected:  Dose('32 mg 8 hrly')},
      {weight:  1.50, expected:  Dose('75 mg 8 hrly')},
      {weight:  2.11, expected: Dose('106 mg 8 hrly')},
      {weight:  3.50, expected: Dose('175 mg 8 hrly')},
    ],
  },
  {
    age: Time.months(1),
    tests: [
      {weight:  3.47, expected: Dose('174 mg 6 hrly')},
      {weight:  5.10, expected: Dose('255 mg 6 hrly')},
      {weight:  5.54, expected: Dose('277 mg 6 hrly')},
      {weight:  6.10, expected: Dose('305 mg 6 hrly')},
    ],
  },
  {
    age: Time.years(3),
    tests: [
      {weight:  9.33, expected: Dose('467 mg 6 hrly')},
      {weight:  9.50, expected: Dose('475 mg 6 hrly')},
      {weight: 10.07, expected: Dose('500 mg 6 hrly')},
      {weight: 12.10, expected: Dose('500 mg 6 hrly')},
    ],
  },
]

TestIterators.AgeWeight.OneExpected('Ampicillin', tests)
