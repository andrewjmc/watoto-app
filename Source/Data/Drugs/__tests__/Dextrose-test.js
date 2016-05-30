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
  route: 'IV (over 3-5 min)',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  1.28, expected:  Dose('2.6 ml of 10% dextrose')},
      {weight:  1.81, expected:  Dose('3.6 ml of 10% dextrose')},
      {weight:  2.31, expected:  Dose('4.6 ml of 10% dextrose')},
    ],
  },
  {
    age: Time.months(2),
    tests: [ // ETAT table
      {weight:  3.00, expected:  Dose('15 ml of 10% dextrose')},
      {weight:  4.00, expected:  Dose('20 ml of 10% dextrose')},
      {weight:  5.00, expected:  Dose('25 ml of 10% dextrose')},
      {weight:  6.00, expected:  Dose('30 ml of 10% dextrose')},
      {weight:  7.00, expected:  Dose('35 ml of 10% dextrose')},
      {weight:  8.00, expected:  Dose('40 ml of 10% dextrose')},
      {weight:  9.00, expected:  Dose('45 ml of 10% dextrose')},
      {weight: 10.00, expected:  Dose('50 ml of 10% dextrose')},
      {weight: 11.00, expected:  Dose('55 ml of 10% dextrose')},
      {weight: 12.00, expected:  Dose('60 ml of 10% dextrose')},
      {weight: 13.00, expected:  Dose('65 ml of 10% dextrose')},
      {weight: 14.00, expected:  Dose('70 ml of 10% dextrose')},
      {weight: 15.00, expected:  Dose('75 ml of 10% dextrose')},
      {weight: 16.00, expected:  Dose('80 ml of 10% dextrose')},
      {weight: 17.00, expected:  Dose('85 ml of 10% dextrose')},
      {weight: 18.00, expected:  Dose('90 ml of 10% dextrose')},
      {weight: 19.00, expected:  Dose('95 ml of 10% dextrose')},
      {weight: 20.00, expected: Dose('100 ml of 10% dextrose')},
    ],
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  9.56, expected: Dose('48 ml of 10% dextrose')},
      {weight: 10.01, expected: Dose('50 ml of 10% dextrose')},
      {weight: 11.11, expected: Dose('56 ml of 10% dextrose')},
      {weight: 13.37, expected: Dose('67 ml of 10% dextrose')},
    ],
  },
  {
    age: Time.years(5),
    tests: [
      {weight: 13.91, expected: Dose('70 ml of 10% dextrose')},
      {weight: 14.63, expected: Dose('73 ml of 10% dextrose')},
      {weight: 16.61, expected: Dose('83 ml of 10% dextrose')},
      {weight: 18.20, expected: Dose('91 ml of 10% dextrose')},
    ],
  },
]

TestIterators.AgeWeight.OneExpected('Dextrose', tests)
