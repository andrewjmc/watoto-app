'use strict'

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const Resus = DrugDose.template({
  heading: 'Resuscitation',
  route: 'IV',
})
const SevereViralCroup = DrugDose.template({
  heading: 'Severe Viral Croup',
  additional: 'If effective, repeat with careful monitoring',
  route: 'Nebulised',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {
        weight:  0.52,
        expected: [
          Resus('0.05 ml of 1:10,000 stat'),
        ],
      },
      {
        weight:  1.28,
        expected: [
          Resus('0.13 ml of 1:10,000 stat'),
        ],
      },
    ],
  },
  {
    age: Time.months(4),
    tests: [
      {
        weight:  2.11,
        expected: [
          Resus('0.21 ml of 1:10,000 stat'),
        ],
      },
      {
        weight:  4.67,
        expected: [
          Resus('0.47 ml of 1:10,000 stat'),
        ],
      },
    ],
  },
  {
    age: Time.years(2),
    tests: [
      {
        weight:  9.55,
        expected: [
          Resus('0.96 ml of 1:10,000 stat'),
          SevereViralCroup('2 ml of 1:1,000 stat'),
        ],
      },
      {
        weight:  13.37,
        expected: [
          Resus('1.34 ml of 1:10,000 stat'),
          SevereViralCroup('2 ml of 1:1,000 stat'),
        ],
      },
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Adrenaline', tests)
