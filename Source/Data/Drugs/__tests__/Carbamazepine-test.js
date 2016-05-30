'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const InitialDose = DrugDose.template({
  heading: 'Initially',
  route: 'PO',
})
const MaintenanceDose = DrugDose.template({
  heading: 'Maintenance',
  route: 'PO',
})

const tests = [
  {
    age: Time.days(3),
    tests: [
      { weight: 2.51, expected: undefined },
      { weight: 3.33, expected: undefined },
    ],
  },
  {
    age: Time.months(1),
    tests: [
      { weight: 2.51, expected: [
        InitialDose('13 mg at night', {additional:'Increased as necessary by\n6-13 mg every 3-7 days'}),
        MaintenanceDose('13 mg 2-3 times daily'),
      ]},
      { weight: 4.37, expected: [
        InitialDose('22 mg at night', {additional:'Increased as necessary by\n11-22 mg every 3-7 days'}),
        MaintenanceDose('22 mg 2-3 times daily'),
      ]},
      { weight: 6.11, expected: [
        InitialDose('31 mg at night', {additional:'Increased as necessary by\n15-31 mg every 3-7 days'}),
        MaintenanceDose('31 mg 2-3 times daily'),
      ]},
    ],
  },
  {
    age: Time.years(2),
    tests: [
      { weight:  9.77, expected: [
        InitialDose('49 mg at night', {additional:'Increased as necessary by\n24-49 mg every 3-7 days'}),
        MaintenanceDose('49 mg 2-3 times daily'),
      ]},
      { weight: 10.56, expected: [
        InitialDose('53 mg at night', {additional:'Increased as necessary by\n26-53 mg every 3-7 days'}),
        MaintenanceDose('53 mg 2-3 times daily'),
      ]},
      { weight: 12.01, expected: [
        InitialDose('60 mg at night', {additional:'Increased as necessary by\n30-60 mg every 3-7 days'}),
        MaintenanceDose('60 mg 2-3 times daily'),
      ]},
    ],
  },
  {
    age: Time.years(5),
    tests: [
      { weight: 14.79, expected: [
        InitialDose('74 mg at night', {additional:'Increased as necessary by\n37-74 mg every 3-7 days'}),
        MaintenanceDose('74 mg 2-3 times daily'),
      ]},
      { weight: 16.24, expected: [
        InitialDose('81 mg at night', {additional:'Increased as necessary by\n41-81 mg every 3-7 days'}),
        MaintenanceDose('81 mg 2-3 times daily'),
      ]},
      { weight: 17.61, expected: [
        InitialDose('88 mg at night', {additional:'Increased as necessary by\n44-88 mg every 3-7 days'}),
        MaintenanceDose('88 mg 2-3 times daily'),
      ]},
    ],
  },
  {
    age: Time.years(13),
    tests: [
      { weight: 24.11, expected: undefined},
      { weight: 32.61, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Carbamazepine', tests)
