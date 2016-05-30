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
  heading: 'Pre-term Infant',
  additional: '2 weeks if HIV +ve',
  route: 'PO',
})
const TermDose = DrugDose.template({
  heading: 'Term Infant',
  additional: '2 weeks if HIV +ve',
  route: 'PO',
})

const tests = [
  {
    age: Time.weeks(4),
    expected: [
      PreTermDose('0.5 ml (50,000 iu) to each\nside of the mouth 6 hrly'),
      TermDose('1 ml (100,000 iu) to each\nside of the mouth 6 hrly'),
    ],
  },
  {age: Time.years(1), expected: undefined},
]

TestIterators.Age.MultiExpected('Nystatin', tests)
