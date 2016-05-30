'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const NeonateDose = DrugDose.template({
  route: 'IM / SC / Slow IV',
})
const ChildPO = DrugDose.template({
  route: 'PO',
})
const ChildDose = DrugDose.template({
  route: 'IM / SC / IV',
})

const tests = [
  {
    age: Time.days(4),
    tests: [
      {weight: 1.51, expected: NeonateDose('0.08-0.3 mg 4 hrly')},
      {weight: 2.32, expected: NeonateDose('0.12-0.46 mg 4 hrly')},
      {weight: 3.96, expected: NeonateDose('0.2-0.79 mg 4 hrly')},
      {weight: 4.72, expected: NeonateDose('0.24-0.94 mg 4 hrly')},
    ],
  },
  {
    age: Time.months(1),
    tests: [
      {weight: 4.11, expected: [
        ChildPO('0.82-2.1 mg\n4-6 hrly as needed'),
        ChildDose('0.41-0.82 mg\n2-4 hrly as needed'),
      ]},
      {weight: 5.69, expected: [
        ChildPO('1.1-2.8 mg\n4-6 hrly as needed'),
        ChildDose('0.57-1.1 mg\n2-4 hrly as needed'),
      ]},
      {weight: 6.54, expected: [
        ChildPO('1.3-3.3 mg\n4-6 hrly as needed'),
        ChildDose('0.65-1.3 mg\n2-4 hrly as needed'),
      ]},
    ],
  },
  {
    age: Time.months(6),
    tests: [
      {weight: 8.71, expected: [
        ChildPO('1.7-4.4 mg\n4-6 hrly as needed'),
        ChildDose('0.87-1.7 mg\n2-4 hrly as needed'),
      ]},
      {weight: 10.01, expected: [
        ChildPO('2-5 mg\n4-6 hrly as needed'),
        ChildDose('1-2 mg\n2-4 hrly as needed'),
      ]},
      {weight: 12.77, expected: [
        ChildPO('2.6-6.4 mg\n4-6 hrly as needed'),
        ChildDose('1.3-2.6 mg\n2-4 hrly as needed'),
      ]},
      {weight: 41.00, expected: [ // not likely!
        ChildPO('8.2-15 mg\n4-6 hrly as needed'),
        ChildDose('4.1-8.2 mg\n2-4 hrly as needed'),
      ]},
      {weight: 76.00, expected: [ // seriously not likely!
        ChildPO('15-15 mg\n4-6 hrly as needed'),
        ChildDose('7.6-15 mg\n2-4 hrly as needed'),
      ]},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Morphine', tests)
