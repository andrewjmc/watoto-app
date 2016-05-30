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
  route: 'IM / IV',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  0.80, expected:  Dose('40 mg 12 hrly')},
      {weight:  0.96, expected:  Dose('48 mg 12 hrly')},
      {weight:  1.18, expected:  Dose('59 mg 12 hrly')},
      {weight:  1.25, expected:  Dose('63 mg 12 hrly')},
      {weight:  1.51, expected:  Dose('76 mg 12 hrly')},
      {weight:  2.32, expected:  Dose('116 mg 12 hrly')},
    ]
  },
  {
    age: Time.weeks(2),
    tests: [
      {weight:  0.80, expected:   Dose('40 mg 12 hrly')},
      {weight:  0.96, expected:   Dose('48 mg 12 hrly')},
      {weight:  1.18, expected:   Dose('59 mg 12 hrly')},
      {weight:  1.25, expected:   Dose('63 mg 8 hrly')},
      {weight:  1.51, expected:   Dose('76 mg 8 hrly')},
      {weight:  2.32, expected:  Dose('116 mg 8 hrly')},
    ]
  },
  {
    age: Time.months(2),
    tests: [
      {weight:  2.32, expected:  Dose('70-116 mg 8 hrly')},
      {weight:  4.14, expected: Dose('124-207 mg 8 hrly')},
      {weight:  5.69, expected: Dose('171-285 mg 8 hrly')},
      {weight:  8.88, expected: Dose('266-444 mg 8 hrly')},
    ]
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  9.61, expected: Dose('288-481 mg 8 hrly')},
      {weight: 11.25, expected: Dose('338-563 mg 8 hrly')},
      {weight: 13.41, expected: Dose('402-671 mg 8 hrly')},
      {weight: 41.00, expected: Dose('1,230-2,000 mg 8 hrly')}, // not likely!
    ]
  },
]

TestIterators.AgeWeight.OneExpected('Ceftazidime', tests)
