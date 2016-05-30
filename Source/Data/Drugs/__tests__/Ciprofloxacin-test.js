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
  additional: 'For 3 days',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  1.51, expected: undefined},
      {weight:  2.70, expected: undefined},
    ]
  },
  {
    age: Time.weeks(4),
    tests: [
      {weight:  3.29, expected: undefined},
      {weight:  4.86, expected: undefined},
    ]
  },
  {
    age: Time.months(4),
    tests: [
      {weight:  3.00, expected: undefined},
      {weight:  4.00, expected: Dose('60 mg 12 hrly\n\u00BC (250 mg) tablet 12 hrly')},
      {weight:  5.00, expected: Dose('75 mg 12 hrly\n\u00BC (250 mg) tablet 12 hrly')},
      {weight:  6.00, expected: Dose('90 mg 12 hrly\n\u00BC (250 mg) tablet 12 hrly')},
      {weight:  7.00, expected: Dose('105 mg 12 hrly\n\u00BD (250 mg) tablet 12 hrly')},
      {weight:  8.00, expected: Dose('120 mg 12 hrly\n\u00BD (250 mg) tablet 12 hrly')},
      {weight:  9.00, expected: Dose('135 mg 12 hrly\n\u00BD (250 mg) tablet 12 hrly')},
      {weight: 10.00, expected: Dose('150 mg 12 hrly\n\u00BD (250 mg) tablet 12 hrly')},
      {weight: 11.00, expected: Dose('165 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 12.00, expected: Dose('180 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 13.00, expected: Dose('195 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 14.00, expected: Dose('210 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 15.00, expected: Dose('225 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 16.00, expected: Dose('240 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 17.00, expected: Dose('255 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 18.00, expected: Dose('270 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 19.00, expected: Dose('285 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 20.00, expected: Dose('300 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
    ]
  },
  {
    age: Time.months(6),
    tests: [
      {weight:  3.25, expected: undefined},
      {weight:  3.83, expected: undefined},
      {weight:  4.21, expected: Dose('63 mg 12 hrly\n\u00BC (250 mg) tablet 12 hrly')},
      {weight:  6.18, expected: Dose('93 mg 12 hrly\n\u00BC (250 mg) tablet 12 hrly')},
      {weight:  6.36, expected: Dose('95 mg 12 hrly\n\u00BD (250 mg) tablet 12 hrly')},
      {weight:  9.99, expected: Dose('150 mg 12 hrly\n\u00BD (250 mg) tablet 12 hrly')},
      {weight: 15.51, expected: Dose('233 mg 12 hrly\n1 (250 mg) tablet 12 hrly')},
      {weight: 25.01, expected: Dose('375 mg 12 hrly\n2 (250 mg) tablets 12 hrly')},
    ]
  },
]

TestIterators.AgeWeight.OneExpected('Ciprofloxacin', tests)
