'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const PreTermDose = DrugDose.template({
  heading: 'Pre-term Newborn',
  route: 'IV',
})
const TermDose = DrugDose.template({
  heading: 'Term Newborn',
  route: 'IV',
})

const tests = [
  {
    age: Time.days(3),
    tests: [
      {weight: 1.28, expected: [
        PreTermDose('64 mg 12 hrly'),
        TermDose('64 mg 8 hrly'),
      ]},
      {weight: 1.81, expected: [
        PreTermDose('91 mg 12 hrly'),
        TermDose('91 mg 8 hrly'),
      ]},
    ],
  },
  {
    age: Time.days(7),
    tests: [
      {weight: 2.33, expected: [
        PreTermDose('117 mg 12 hrly'),
        TermDose('117 mg 8 hrly'),
      ]},
      {weight: 3.28, expected: [
        PreTermDose('164 mg 12 hrly'),
        TermDose('164 mg 8 hrly'),
      ]},
    ],
  },
  {
    age: Time.weeks(2),
    tests: [
      {weight: 2.11, expected: undefined},
      {weight: 3.65, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Cefotaxime', tests)
