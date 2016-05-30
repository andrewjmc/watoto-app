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
  route: 'PO / IV',
})

const tests = [
  {weight:  0.52, expected:     Dose('5-8 mg 6-8 hrly')},
  {weight:  1.98, expected:   Dose('20-30 mg 6-8 hrly')},
  {weight:  2.01, expected:   Dose('20-30 mg 6-8 hrly')},
  {weight:  4.44, expected:   Dose('44-67 mg 6-8 hrly')},
  {weight:  8.25, expected:  Dose('83-124 mg 6-8 hrly')},
  {weight: 12.75, expected: Dose('128-191 mg 6-8 hrly')},
  {weight: 18.33, expected: Dose('183-275 mg 6-8 hrly')},
  {weight: 21.50, expected: Dose('215-323 mg 6-8 hrly')},
]

TestIterators.Weight.OneExpected('Paracetamol', tests)
