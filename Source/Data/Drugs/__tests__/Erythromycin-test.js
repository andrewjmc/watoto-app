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
  route: 'PO',
})

const tests = [
  {weight:  0.52, expected:       Dose('16-26 mg 24 hrly\nin 3-4 divided doses')},
  {weight:  1.98, expected:       Dose('59-99 mg 24 hrly\nin 3-4 divided doses')},
  {weight:  2.01, expected:      Dose('60-100 mg 24 hrly\nin 3-4 divided doses')},
  {weight:  4.44, expected:     Dose('133-222 mg 24 hrly\nin 3-4 divided doses')},
  {weight:  8.25, expected:     Dose('248-413 mg 24 hrly\nin 3-4 divided doses')},
  {weight: 12.75, expected:     Dose('383-638 mg 24 hrly\nin 3-4 divided doses')},
  {weight: 18.33, expected:     Dose('550-916 mg 24 hrly\nin 3-4 divided doses')},
  {weight: 21.50, expected:   Dose('645-1,075 mg 24 hrly\nin 3-4 divided doses')},
  {weight: 41.00, expected: Dose('1,230-2,000 mg 24 hrly\nin 3-4 divided doses')}, // not likely!
  {weight: 67.00, expected: Dose('2,000-2,000 mg 24 hrly\nin 3-4 divided doses')}, // seriously not likely!
]

TestIterators.Weight.OneExpected('Erythromycin', tests)
