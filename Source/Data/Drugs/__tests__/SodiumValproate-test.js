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
  route: 'PO',
})
const MaintenanceDose = DrugDose.template({
  heading: 'Maintenance',
  route: 'PO',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  0.63, expected: [
        LoadingDose('13 mg stat'),
        MaintenanceDose('6 mg 12 hrly'),
      ]},
      {weight:  1.01, expected: [
        LoadingDose('20 mg stat'),
        MaintenanceDose('10 mg 12 hrly'),
      ]},
      {weight:  1.50, expected: [
        LoadingDose('30 mg stat'),
        MaintenanceDose('15 mg 12 hrly'),
      ]},
      {weight:  2.11, expected: [
        LoadingDose('42 mg stat'),
        MaintenanceDose('21 mg 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.weeks(4),
    tests: [
      {weight:  3.29, expected: [
        LoadingDose('66 mg stat'),
        MaintenanceDose('33 mg 12 hrly'),
      ]},
      {weight:  4.86, expected: [
        LoadingDose('97 mg stat'),
        MaintenanceDose('49 mg 12 hrly'),
      ]},
    ]
  },
  {
    age: Time.months(1),
    tests: [
      {weight:  3.47, expected: [
        LoadingDose('35-52 mg\nin 1-2 divided doses'),
        MaintenanceDose('87-104 mg 24 hrly\nin 2 divided doses'),
      ]},
      {weight:  5.10, expected: [
        LoadingDose('51-77 mg\nin 1-2 divided doses'),
        MaintenanceDose('127-153 mg 24 hrly\nin 2 divided doses'),
      ]},
      {weight:  5.54, expected: [
        LoadingDose('55-83 mg\nin 1-2 divided doses'),
        MaintenanceDose('139-166 mg 24 hrly\nin 2 divided doses'),
      ]},
      {weight:  6.10, expected: [
        LoadingDose('61-92 mg\nin 1-2 divided doses'),
        MaintenanceDose('153-183 mg 24 hrly\nin 2 divided doses'),
      ]},
    ],
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  8.91, expected: [
        LoadingDose('89-134 mg\nin 1-2 divided doses'),
        MaintenanceDose('223-267 mg 24 hrly\nin 2 divided doses'),
      ]},
      {weight: 10.03, expected: [
        LoadingDose('100-150 mg\nin 1-2 divided doses'),
        MaintenanceDose('251-301 mg 24 hrly\nin 2 divided doses'),
      ]},
      {weight: 11.22, expected: [
        LoadingDose('112-168 mg\nin 1-2 divided doses'),
        MaintenanceDose('281-337 mg 24 hrly\nin 2 divided doses'),
      ]},
      {weight: 13.37, expected: [
        LoadingDose('134-201 mg\nin 1-2 divided doses'),
        MaintenanceDose('334-401 mg 24 hrly\nin 2 divided doses'),
      ]},
      {weight: 13.37, expected: [
        LoadingDose('134-201 mg\nin 1-2 divided doses'),
        MaintenanceDose('334-401 mg 24 hrly\nin 2 divided doses'),
      ]},
    ]
  },
]

TestIterators.AgeWeight.MultiExpected('SodiumValproate', tests)
