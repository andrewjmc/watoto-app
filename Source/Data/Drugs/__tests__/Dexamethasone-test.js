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
  heading: 'Severe Viral Croup',
  route: 'IV / IM',
})

const tests = [
  {weight:  0.52, expected:  Dose('0.3 mg stat')},
  {weight:  1.98, expected:  Dose('1.2 mg stat')},
  {weight:  2.01, expected:  Dose('1.2 mg stat')},
  {weight:  4.44, expected:  Dose('2.7 mg stat')},
  {weight:  8.25, expected:  Dose('5 mg stat')},
  {weight: 12.75, expected:  Dose('7.6 mg stat')},
  {weight: 18.33, expected: Dose('11 mg stat')},
  {weight: 21.50, expected: Dose('12.9 mg stat')},
]

TestIterators.Weight.OneExpected('Dexamethasone', tests)
