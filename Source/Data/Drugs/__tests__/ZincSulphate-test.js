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
  additional: 'For 14 days',
  route: 'PO',
})

const tests = [
  {age:  Time.weeks(4), expected: Dose('10 mg 24 hrly')},
  {age: Time.months(6), expected: Dose('10 mg 24 hrly')},
  {age: Time.months(7), expected: Dose('20 mg 24 hrly')},
  {age:  Time.years(2), expected: Dose('20 mg 24 hrly')},
]

TestIterators.Age.OneExpected('ZincSulphate', tests)
