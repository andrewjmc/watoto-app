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
  route: 'IM / Slow IV',
})

const tests = [
  {
    age: Time.days(3),
    tests: [ // As per ETAT (with exceptions)
      {weight:  1.00, expected:  Dose('3 mg 24 hrly')},
      {weight:  1.25, expected:  Dose('4 mg 24 hrly')},
      {weight:  1.50, expected:  Dose('4.5 mg 24 hrly')}, // 5
      {weight:  1.75, expected:  Dose('5.5 mg 24 hrly')}, // 6
      {weight:  2.00, expected: Dose('10 mg 24 hrly')},
      {weight:  2.50, expected: Dose('12.5 mg 24 hrly')},
      {weight:  3.00, expected: Dose('15 mg 24 hrly')},
      {weight:  4.00, expected: Dose('20 mg 24 hrly')},
    ]
  },
  {
    age: Time.days(5),
    tests: [ // Others
      {weight:  0.84, expected:  Dose('2.5 mg 24 hrly')},
      {weight:  1.03, expected:  Dose('3 mg 24 hrly')},
      {weight:  1.46, expected:  Dose('4.5 mg 24 hrly')},
      {weight:  1.53, expected:  Dose('4.5 mg 24 hrly')},
      {weight:  2.22, expected: Dose('11 mg 24 hrly')},
      {weight:  3.91, expected: Dose('19.5 mg 24 hrly')},
    ]
  },
  {
    age: Time.years(2),
    tests: [ // As per ETAT (with exceptions)
      {weight:  3.00, expected:  Dose('23 mg 24 hrly')}, // 20
      {weight:  4.00, expected:  Dose('30 mg 24 hrly')},
      {weight:  5.00, expected:  Dose('38 mg 24 hrly')}, // 35
      {weight:  6.00, expected:  Dose('45 mg 24 hrly')},
      {weight:  7.00, expected:  Dose('53 mg 24 hrly')}, // 50
      {weight:  8.00, expected:  Dose('60 mg 24 hrly')},
      {weight:  9.00, expected:  Dose('68 mg 24 hrly')}, // 65
      {weight: 10.00, expected:  Dose('75 mg 24 hrly')},
      {weight: 11.00, expected:  Dose('83 mg 24 hrly')}, // 80
      {weight: 12.00, expected:  Dose('90 mg 24 hrly')},
      {weight: 13.00, expected:  Dose('98 mg 24 hrly')}, // 95
      {weight: 14.00, expected: Dose('105 mg 24 hrly')},
      {weight: 15.00, expected: Dose('113 mg 24 hrly')}, // 110
      {weight: 16.00, expected: Dose('120 mg 24 hrly')},
      {weight: 17.00, expected: Dose('128 mg 24 hrly')}, // 125
      {weight: 18.00, expected: Dose('135 mg 24 hrly')},
      {weight: 19.00, expected: Dose('143 mg 24 hrly')}, // 140
      {weight: 20.00, expected: Dose('150 mg 24 hrly')},
    ]
  },
  {
    age: Time.years(3),
    tests: [ // Others
      {weight:  9.98, expected:  Dose('75 mg 24 hrly')},
      {weight: 12.21, expected:  Dose('92 mg 24 hrly')},
      {weight: 14.52, expected: Dose('109 mg 24 hrly')},
      {weight: 17.36, expected: Dose('130 mg 24 hrly')},
      {weight: 22.11, expected: Dose('166 mg 24 hrly')},
    ]
  },
]

TestIterators.AgeWeight.OneExpected('Gentamicin', tests)
