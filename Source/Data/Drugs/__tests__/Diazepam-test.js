'use strict'

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const IV = DrugDose.template({
  route: 'IV',
})
const PR = DrugDose.template({
  route: 'PR',
})

const tests = [
  {
    age: Time.weeks(4),
    tests: [
      {weight: 1.25, expected: undefined},
      {weight: 2.59, expected: undefined},
      {weight: 3.21, expected: undefined},
    ]
  },
  {
    age: Time.months(4),
    tests: [ // ETAT table
      {
        weight:  3.00,
        expected: [
          // IV('1.0 mg stat\n0.20 ml (10mg/2ml) stat'), // 3 * 0.3 = 0.9 (bit hard to build a rounding rule -> 1.0)
          IV('0.9 mg stat\n0.2 ml (10mg/2ml) stat'), // -0.1 mg from ETAT table (ml the same)
          PR('1.5 mg stat\n0.3 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight:  4.00,
        expected: [
          IV('1.2 mg stat\n0.25 ml (10mg/2ml) stat'),
          PR('2 mg stat\n0.4 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight:  5.00,
        expected: [
          IV('1.5 mg stat\n0.3 ml (10mg/2ml) stat'),
          PR('2.5 mg stat\n0.5 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight:  6.00,
        expected: [
          IV('1.8 mg stat\n0.35 ml (10mg/2ml) stat'),
          PR('3 mg stat\n0.6 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight:  7.00,
        expected: [
          IV('2.1 mg stat\n0.4 ml (10mg/2ml) stat'),
          PR('3.5 mg stat\n0.7 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight:  8.00,
        expected: [
          IV('2.4 mg stat\n0.5 ml (10mg/2ml) stat'),
          PR('4 mg stat\n0.8 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight:  9.00,
        expected: [
          IV('2.7 mg stat\n0.55 ml (10mg/2ml) stat'),
          PR('4.5 mg stat\n0.9 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 10.00,
        expected: [
          IV('3 mg stat\n0.6 ml (10mg/2ml) stat'),
          PR('5 mg stat\n1 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 11.00,
        expected: [
          IV('3.3 mg stat\n0.65 ml (10mg/2ml) stat'),
          PR('5.5 mg stat\n1.1 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 12.00,
        expected: [
          IV('3.6 mg stat\n0.7 ml (10mg/2ml) stat'),
          PR('6 mg stat\n1.2 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 13.00,
        expected: [
          IV('3.9 mg stat\n0.8 ml (10mg/2ml) stat'),
          PR('6.5 mg stat\n1.3 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 14.00,
        expected: [
          IV('4.2 mg stat\n0.85 ml (10mg/2ml) stat'),
          PR('7 mg stat\n1.4 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 15.00,
        expected: [
          IV('4.5 mg stat\n0.9 ml (10mg/2ml) stat'),
          PR('7.5 mg stat\n1.5 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 16.00,
        expected: [
          IV('4.8 mg stat\n0.95 ml (10mg/2ml) stat'),
          PR('8 mg stat\n1.6 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 17.00,
        expected: [
          IV('5.1 mg stat\n1 ml (10mg/2ml) stat'),
          PR('8.5 mg stat\n1.7 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 18.00,
        expected: [
          IV('5.4 mg stat\n1.1 ml (10mg/2ml) stat'),
          PR('9 mg stat\n1.8 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 19.00,
        expected: [
          IV('5.7 mg stat\n1.15 ml (10mg/2ml) stat'),
          PR('9.5 mg stat\n1.9 ml (10mg/2ml) stat'),
        ],
      },
      {
        weight: 20.00,
        expected: [
          IV('6 mg stat\n1.2 ml (10mg/2ml) stat'),
          PR('10 mg stat\n2 ml (10mg/2ml) stat'),
        ],
      },
    ]
  },
]

TestIterators.AgeWeight.MultiExpected('Diazepam', tests)
