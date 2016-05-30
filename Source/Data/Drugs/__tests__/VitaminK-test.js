'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const NewbornDose = DrugDose.template({
  heading: 'Newborn',
  route: 'IM',
})
const LiverDose = DrugDose.template({
  heading: 'Liver Disease',
  additional: 'max 10 mg',
  route: 'Slow IV',
})

const tests = [
  {
    age: Time.days(3),
    tests: [
      {weight: 0.81, expected: [
        NewbornDose('0.5 mg stat'),
        LiverDose('0.24 mg stat'),
      ]},
      {weight: 1.39, expected: [
        NewbornDose('0.5 mg stat'),
        LiverDose('0.42 mg stat'),
      ]},
      {weight: 1.81, expected: [
        NewbornDose('1 mg stat'),
        LiverDose('0.54 mg stat'),
      ]},
      {weight: 2.32, expected: [
        NewbornDose('1 mg stat'),
        LiverDose('0.7 mg stat'),
      ]},
    ],
  },
  {
    age: Time.weeks(4),
    tests: [
      {weight: 3.47, expected: LiverDose('1 mg stat')},
      {weight: 5.10, expected: LiverDose('1.5 mg stat')},
      {weight: 5.54, expected: LiverDose('1.7 mg stat')},
      {weight: 6.10, expected: LiverDose('1.8 mg stat')},
    ],
  },
  {
    age: Time.years(3),
    tests: [
      {weight:  9.33, expected: LiverDose('2.8 mg stat')},
      {weight:  9.50, expected: LiverDose('2.9 mg stat')},
      {weight: 10.07, expected: LiverDose('3 mg stat')},
      {weight: 12.10, expected: LiverDose('3.6 mg stat')},
      {weight: 34.00, expected: LiverDose('10 mg stat')}, // seriously not likely!
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('VitaminK', tests)
