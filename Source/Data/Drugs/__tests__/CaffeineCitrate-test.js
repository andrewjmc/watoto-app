'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const LoadingDose = DrugDose.template({
  heading: 'Loading Dose',
  route: 'PO (or IV over 30 min)',
})
const MaintenanceDose = DrugDose.template({
  heading: 'Maintenance',
  route: 'PO (or IV over 30 min)',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  0.52, expected: [
        LoadingDose('10 mg stat'),
        MaintenanceDose('3 mg 24 hrly'),
      ]},
      {weight:  1.98, expected: [
        LoadingDose('40 mg stat'),
        MaintenanceDose('10 mg 24 hrly'),
      ]},
      {weight:  2.01, expected: [
        LoadingDose('40 mg stat'),
        MaintenanceDose('10 mg 24 hrly'),
      ]},
    ],
  },
  {
    age: Time.months(2),
    tests: [
      {weight:  4.44, expected: [
        LoadingDose('89 mg stat'),
        MaintenanceDose('22 mg 24 hrly'),
      ]},
      {weight:  8.25, expected: [
        LoadingDose('165 mg stat'),
        MaintenanceDose('41 mg 24 hrly'),
      ]},
      {weight: 12.75, expected: [
        LoadingDose('255 mg stat'),
        MaintenanceDose('64 mg 24 hrly'),
      ]},
    ],
  },
  {
    age: Time.weeks(14),
    tests: [
      {weight:  4.44, expected: undefined},
      {weight:  6.66, expected: undefined},
      {weight: 21.50, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('CaffeineCitrate', tests)
