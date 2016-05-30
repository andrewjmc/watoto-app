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
    age: Time.weeks(1),
    tests: [
      {weight:  0.84, expected: undefined},
      {weight:  2.55, expected: undefined},
    ],
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  5.54, expected: Dose('2.8 mg 4-6 hrly')},
      {weight:  6.10, expected: Dose('3.1 mg 4-6 hrly')},
      {weight:  7.42, expected: Dose('3.7 mg 4-6 hrly')},
      {weight:  8.77, expected: Dose('4.4 mg 4-6 hrly')},
    ],
  },
  {
    age: Time.years(3),
    tests: [
      {weight:  9.33, expected: Dose('4.7 mg 4-6 hrly')},
      {weight:  9.50, expected: Dose('4.8 mg 4-6 hrly')},
      {weight: 10.07, expected: Dose('5 mg 4-6 hrly')},
      {weight: 12.10, expected: Dose('6.1 mg 4-6 hrly')},
    ],
  },
  {
    age: Time.months(49),
    tests: [
      {weight: 10.07, expected: Dose('5-10.1 mg 4-6 hrly')},
      {weight: 12.10, expected: Dose('6.1-12.1 mg 4-6 hrly')},
      {weight: 13.21, expected: Dose('6.6-13.2 mg 4-6 hrly')},
      {weight: 14.74, expected: Dose('7.4-14.7 mg 4-6 hrly')},
    ],
  },
  {
    age: Time.years(5),
    tests: [
      {weight: 15.11, expected:  Dose('7.6-15.1 mg 4-6 hrly')},
      {weight: 16.92, expected:  Dose('8.5-16.9 mg 4-6 hrly')},
      {weight: 18.74, expected:  Dose('9.4-18.7 mg 4-6 hrly')},
      {weight: 20.10, expected: Dose('10.1-20.1 mg 4-6 hrly')},
      {weight: 31.13, expected: Dose('15.6-30 mg 4-6 hrly')}, // not likely!
      {weight: 61.00, expected: Dose('30-30 mg 4-6 hrly')}, // seriously not likely!
    ],
  },
  {
    age: Time.years(13),
    tests: [
      {weight: 27.21, expected: undefined},
      {weight: 35.22, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.OneExpected('Dihydrocodeine', tests)
