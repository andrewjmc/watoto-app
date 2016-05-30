'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const AnaemiaDose = DrugDose.template({
  heading: 'Iron Deficiency Anaemia',
  additional: 'Of Elemental Iron',
  route: 'PO',
})
const ProphylaxisDose = DrugDose.template({
  heading: 'Prophylaxis',
  additional: 'Of Elemental Iron',
  route: 'PO',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  1.53, expected: [
        AnaemiaDose('Pre-term: 3-6 mg 24 hrly'),
        ProphylaxisDose('Pre-term: 3-6 mg 24 hrly\nTerm: 2-3 mg 24 hrly'),
      ]},
      {weight:  2.32, expected: [
        AnaemiaDose('Pre-term: 5-9 mg 24 hrly'),
        ProphylaxisDose('Pre-term: 5-9 mg 24 hrly\nTerm: 2-5 mg 24 hrly'),
      ]},
      {weight:  4.14, expected: [
        AnaemiaDose('Pre-term: 8-15 mg 24 hrly'),
        ProphylaxisDose('Pre-term: 8-15 mg 24 hrly\nTerm: 4-8 mg 24 hrly'),
      ]},
      {weight:  7.91, expected: [ // not likely!
        AnaemiaDose('Pre-term: 15 mg 24 hrly'),
        ProphylaxisDose('Pre-term: 15 mg 24 hrly\nTerm: 8-15 mg 24 hrly'),
      ]},
      {weight: 15.51, expected: [ // seriously not likely!
        AnaemiaDose('Pre-term: 15 mg 24 hrly'),
        ProphylaxisDose('Pre-term: 15 mg 24 hrly\nTerm: 15 mg 24 hrly'),
      ]},
    ]
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  8.91, expected: AnaemiaDose('27-53 mg 24 hrly')},
      {weight: 10.03, expected: AnaemiaDose('30-60 mg 24 hrly')},
      {weight: 11.22, expected: AnaemiaDose('34-67 mg 24 hrly')},
      {weight: 13.37, expected: AnaemiaDose('40-80 mg 24 hrly')},
    ]
  },
]

TestIterators.AgeWeight.MultiExpected('Iron', tests)
