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
  additional: 'For 3 days',
  route: 'PO',
})

const tests = [
  {weight:  2.32, expected:  Dose('23 mg 24 hrly')},
  {weight:  4.14, expected:  Dose('41 mg 24 hrly')},
  {weight:  5.61, expected:  Dose('56 mg 24 hrly')},
  {weight:  7.17, expected:  Dose('72 mg 24 hrly')},
  {weight:  9.99, expected: Dose('100 mg 24 hrly')},
  {weight: 12.83, expected: Dose('128 mg 24 hrly')},
  {weight: 18.28, expected: Dose('183 mg 24 hrly')},
  {weight: 51.00, expected: Dose('500 mg 24 hrly')}, // not likely!
]

TestIterators.Weight.OneExpected('Azithromycin', tests)
