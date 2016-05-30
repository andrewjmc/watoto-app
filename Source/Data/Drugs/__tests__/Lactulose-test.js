'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const HepEncDose = DrugDose.template({
  heading: 'Hepatic Encephalopathy',
  additional: 'Adjust dosage to produce\n2-3 soft stools per day',
  route: 'PO',
})
const ConstipDose = DrugDose.template({
  heading: 'Chronic Constipation',
  additional: 'max 40 g (60 ml)',
  route: 'PO',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  1.50, expected: HepEncDose('1.7-6.7 g (2.5-10 ml) 24 hrly\ndivided in 3-4 doses')},
      {weight:  2.11, expected: HepEncDose('1.7-6.7 g (2.5-10 ml) 24 hrly\ndivided in 3-4 doses')},
    ],
  },
  {
    age: Time.weeks(4),
    tests: [
      {weight:  2.83, expected: HepEncDose('1.7-6.7 g (2.5-10 ml) 24 hrly\ndivided in 3-4 doses')},
      {weight:  3.50, expected: HepEncDose('1.7-6.7 g (2.5-10 ml) 24 hrly\ndivided in 3-4 doses')},
    ],
  },
  {
    age: Time.years(3),
    tests: [
      {weight:  9.33, expected: [
        HepEncDose('25-60 g (40-90 ml) 24 hrly\ndivided in 3-4 doses'),
        ConstipDose('7-19 g (9-28 ml) 24 hrly\nin divided doses'),
      ]},
      {weight:  9.51, expected: [
        HepEncDose('25-60 g (40-90 ml) 24 hrly\ndivided in 3-4 doses'),
        ConstipDose('7-19 g (10-29 ml) 24 hrly\nin divided doses'),
      ]},
      {weight: 10.07, expected: [
        HepEncDose('25-60 g (40-90 ml) 24 hrly\ndivided in 3-4 doses'),
        ConstipDose('7-20 g (10-30 ml) 24 hrly\nin divided doses'),
      ]},
      {weight: 12.10, expected: [
        HepEncDose('25-60 g (40-90 ml) 24 hrly\ndivided in 3-4 doses'),
        ConstipDose('8-24 g (12-36 ml) 24 hrly\nin divided doses'),
      ]},
      {weight: 21.00, expected: [ // not likely!
        HepEncDose('25-60 g (40-90 ml) 24 hrly\ndivided in 3-4 doses'),
        ConstipDose('15-40 g (21-60 ml) 24 hrly\nin divided doses'),
      ]},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Lactulose', tests)
