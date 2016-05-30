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
  heading: 'Hypokalemia',
  additional: 'Monitor serum potassium',
  route: 'PO',
})

const tests = [
  {weight:  0.52, expected:   Dose('1-2 mmol 24 hrly')},
  {weight:  1.98, expected:   Dose('2-8 mmol 24 hrly')},
  {weight:  2.01, expected:   Dose('2-8 mmol 24 hrly')},
  {weight:  4.44, expected:  Dose('4-18 mmol 24 hrly')},
  {weight:  8.25, expected:  Dose('8-33 mmol 24 hrly')},
  {weight: 12.75, expected: Dose('13-50 mmol 24 hrly')},
  {weight: 18.33, expected: Dose('18-50 mmol 24 hrly')},
  {weight: 21.50, expected: Dose('22-50 mmol 24 hrly')},
]

TestIterators.Weight.OneExpected('Potassium', tests)
