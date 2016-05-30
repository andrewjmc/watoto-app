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
  heading: 'Asthma',
  additional: 'Usually for 3-5 days',
  route: 'PO',
})

const tests = [
  {weight:  0.52, expected:  Dose('1 mg 24 hrly')},
  {weight:  1.98, expected:  Dose('4 mg 24 hrly')},
  {weight:  2.01, expected:  Dose('4 mg 24 hrly')},
  {weight:  4.44, expected:  Dose('8.9 mg 24 hrly')},
  {weight:  8.25, expected: Dose('17 mg 24 hrly')},
  {weight: 12.75, expected: Dose('26 mg 24 hrly')},
  {weight: 18.33, expected: Dose('37 mg 24 hrly')},
  {weight: 21.50, expected: Dose('40 mg 24 hrly')},
]

TestIterators.Weight.OneExpected('Prednisolone', tests)
