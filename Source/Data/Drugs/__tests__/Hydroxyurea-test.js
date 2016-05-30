'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const InitialDose = DrugDose.template({
  heading: 'Initially',
  route: 'PO',
})
const UsualDose = DrugDose.template({
  heading: 'Usual Dose',
  route: 'PO',
})

const tests = [
  {
    age: Time.months(6),
    tests: [
      {weight:  2.32, expected: undefined},
      {weight:  4.14, expected: undefined},
      {weight:  5.61, expected: undefined},
    ]
  },
  {
    age: Time.years(3),
    tests: [
      {weight:  9.98, expected: [
        InitialDose('100-150 mg 24 hrly', {additional:'Increased every 12 weeks in steps of\n25-50 mg according to the response'}),
        UsualDose('150-299 mg 24 hrly', {additional:'max 349 mg'}),
      ]},
      {weight: 12.21, expected: [
        InitialDose('122-183 mg 24 hrly', {additional:'Increased every 12 weeks in steps of\n31-61 mg according to the response'}),
        UsualDose('183-366 mg 24 hrly', {additional:'max 427 mg'}),
      ]},
      {weight: 14.52, expected: [
        InitialDose('145-218 mg 24 hrly', {additional:'Increased every 12 weeks in steps of\n36-73 mg according to the response'}),
        UsualDose('218-436 mg 24 hrly', {additional:'max 508 mg'}),
      ]},
      {weight: 17.36, expected: [
        InitialDose('174-260 mg 24 hrly', {additional:'Increased every 12 weeks in steps of\n43-87 mg according to the response'}),
        UsualDose('260-521 mg 24 hrly', {additional:'max 608 mg'}),
      ]},
    ]
  },
  {
    age: Time.years(13),
    tests: [
      {weight: 27.21, expected: undefined},
      {weight: 35.22, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Hydroxyurea', tests)
