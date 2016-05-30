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
    tests: [ // ETAT table
      {weight:  1.00, expected:  Dose('50,000 iu 12 hrly')},
      {weight:  1.25, expected:  Dose('75,000 iu 12 hrly')},
      {weight:  1.50, expected:  Dose('75,000 iu 12 hrly')},
      {weight:  1.75, expected: Dose('100,000 iu 12 hrly')},
      {weight:  2.00, expected: Dose('100,000 iu 12 hrly')},
      {weight:  2.50, expected: Dose('150,000 iu 12 hrly')},
      {weight:  3.00, expected: Dose('150,000 iu 12 hrly')},
      {weight:  4.00, expected: Dose('200,000 iu 12 hrly')},
    ]
  },
  {
    age: Time.months(6),
    tests: [ // ETAT table
      {weight:  3.00, expected: Dose('150,000 iu 6 hrly')},
      {weight:  4.00, expected: Dose('200,000 iu 6 hrly')},
      {weight:  5.00, expected: Dose('250,000 iu 6 hrly')},
      {weight:  6.00, expected: Dose('300,000 iu 6 hrly')},
      {weight:  7.00, expected: Dose('350,000 iu 6 hrly')},
      {weight:  8.00, expected: Dose('400,000 iu 6 hrly')},
      {weight:  9.00, expected: Dose('450,000 iu 6 hrly')},
    ]
  },
  {
    age: Time.years(3),
    tests: [ // ETAT table
      {weight: 10.00, expected:   Dose('500,000 iu 6 hrly')},
      {weight: 11.00, expected:   Dose('550,000 iu 6 hrly')},
      {weight: 12.00, expected:   Dose('600,000 iu 6 hrly')},
      {weight: 13.00, expected:   Dose('650,000 iu 6 hrly')},
      {weight: 14.00, expected:   Dose('700,000 iu 6 hrly')},
      {weight: 15.00, expected:   Dose('750,000 iu 6 hrly')},
      {weight: 16.00, expected:   Dose('800,000 iu 6 hrly')},
      {weight: 17.00, expected:   Dose('850,000 iu 6 hrly')},
      {weight: 18.00, expected:   Dose('900,000 iu 6 hrly')},
      {weight: 19.00, expected:   Dose('950,000 iu 6 hrly')},
      {weight: 20.00, expected: Dose('1,000,000 iu 6 hrly')},
    ],
  },
]

TestIterators.AgeWeight.OneExpected('BenzylPenicillin', tests)
