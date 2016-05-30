'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const NewbornDose = DrugDose.template({
  additional: 'Not recommended, consider Cefotaxime',
  route: 'IV / IM',
})
const SepsisDose = DrugDose.template({
  heading: 'Meningitis / Very Severe Sepsis',
  additional: 'max 4 grams per 24 hrs',
  route: 'IV / IM',
})
const Dose = DrugDose.template({
  route: 'IV / IM',
})

const tests = [
  {
    age: Time.days(3),
    tests: [ // ETAT table
      {weight:  1.00, expected:  NewbornDose('50 mg 24 hrly')},
      {weight:  1.25, expected:  NewbornDose('62.5 mg 24 hrly')},
      {weight:  1.50, expected:  NewbornDose('75 mg 24 hrly')},
      {weight:  1.75, expected:  NewbornDose('75 mg 24 hrly')},
      {weight:  2.00, expected: NewbornDose('100 mg 24 hrly')},
      {weight:  2.50, expected: NewbornDose('125 mg 24 hrly')},
      {weight:  3.00, expected: NewbornDose('150 mg 24 hrly')},
      {weight:  4.00, expected: NewbornDose('200 mg 24 hrly')},
    ]
  },
  {
    age: Time.days(5),
    tests: [ // Others
      {weight:  0.84, expected:  NewbornDose('37.5 mg 24 hrly')},
      {weight:  1.03, expected:  NewbornDose('50 mg 24 hrly')},
      {weight:  1.46, expected:  NewbornDose('75 mg 24 hrly')},
      {weight:  1.53, expected:  NewbornDose('75 mg 24 hrly')},
      {weight:  2.22, expected: NewbornDose('100 mg 24 hrly')},
      {weight:  3.91, expected: NewbornDose('200 mg 24 hrly')},
    ]
  },
  {
    age: Time.years(2),
    tests: [ // ETAT table
      {weight:  3.00, expected:  SepsisDose('150 mg 12 hrly')},
      {weight:  4.00, expected:  SepsisDose('200 mg 12 hrly')},
      {weight:  5.00, expected:  SepsisDose('250 mg 12 hrly')},
      {weight:  6.00, expected:  SepsisDose('300 mg 12 hrly')},
      {weight:  7.00, expected:  SepsisDose('350 mg 12 hrly')},
      {weight:  8.00, expected:  SepsisDose('400 mg 12 hrly')},
      {weight:  9.00, expected:  SepsisDose('450 mg 12 hrly')},
      {weight: 10.00, expected:  SepsisDose('500 mg 12 hrly')},
      {weight: 11.00, expected:  SepsisDose('550 mg 12 hrly')},
      {weight: 12.00, expected:  SepsisDose('600 mg 12 hrly')},
      {weight: 13.00, expected:  SepsisDose('650 mg 12 hrly')},
      {weight: 14.00, expected:  SepsisDose('700 mg 12 hrly')},
      {weight: 15.00, expected:  SepsisDose('750 mg 12 hrly')},
      {weight: 16.00, expected:  SepsisDose('800 mg 12 hrly')},
      {weight: 17.00, expected:  SepsisDose('850 mg 12 hrly')},
      {weight: 18.00, expected:  SepsisDose('900 mg 12 hrly')},
      {weight: 19.00, expected:  SepsisDose('950 mg 12 hrly')},
      {weight: 20.00, expected: SepsisDose('1,000 mg 12 hrly')},
    ]
  },
  {
    age: Time.years(3),
    tests: [ // Others
      {weight:  9.98, expected:  SepsisDose('500 mg 12 hrly')},
      {weight: 12.21, expected:  SepsisDose('600 mg 12 hrly')},
      {weight: 14.52, expected:  SepsisDose('725 mg 12 hrly')},
      {weight: 17.36, expected:  SepsisDose('875 mg 12 hrly')},
      {weight: 41.00, expected: SepsisDose('2,000 mg 12 hrly')}, // not likely!
    ]
  },
]

TestIterators.AgeWeight.OneExpected('Ceftriaxone', tests)
