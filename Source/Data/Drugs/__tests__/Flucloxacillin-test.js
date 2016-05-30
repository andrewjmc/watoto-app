'use strict'  

const _ = require('lodash')

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const additionalDecorator = (x) => {
  if (_.replace(x.dose, /[^\n]/g, '').length > 1) {
    x.additional = 'One of the above'
  }
}

const Dose = DrugDose.template({
  route: 'IV / IM',
})
const PODose = DrugDose.template({
  route: 'PO',
}, additionalDecorator)

const tests = [
  {
    age: Time.days(5),
    tests: [ // ETAT table
      {weight:  1.00, expected: [
        Dose('50 mg 12 hrly'),
        PODose(
          '25 mg 12 hrly\n' +
          '1 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  1.25, expected: [
        Dose('60 mg 12 hrly'),
        PODose(
          '30 mg 12 hrly\n' +
          '1 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  1.50, expected: [
        Dose('75 mg 12 hrly'),
        PODose(
          '40 mg 12 hrly\n' +
          '2 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  1.75, expected: [
        Dose('85 mg 12 hrly'),
        PODose(
          '45 mg 12 hrly\n' +
          '2 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  2.00, expected: [
        Dose('100 mg 12 hrly'),
        PODose(
          '50 mg 12 hrly\n' +
          '2 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  2.50, expected: [
        Dose('125 mg 12 hrly'),
        PODose(
          '65 mg 12 hrly\n' +
          '3 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  3.00, expected: [
        Dose('150 mg 12 hrly'),
        PODose(
          '75 mg 12 hrly\n' +
          '3 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  4.00, expected: [
        Dose('200 mg 12 hrly'),
        PODose(
          '100 mg 12 hrly\n' +
          '4 ml (125mg/5ml) 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.weeks(1),
    tests: [
      {weight:  0.63, expected: [
        Dose('30 mg 12 hrly'),
        PODose(
          '15 mg 12 hrly\n' +
          '1 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  0.84, expected: [
        Dose('40 mg 12 hrly'),
        PODose(
          '20 mg 12 hrly\n' +
          '1 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  1.78, expected: [
        Dose('85 mg 12 hrly'),
        PODose(
          '45 mg 12 hrly\n' +
          '2 ml (125mg/5ml) 12 hrly'),
      ]},
      {weight:  2.31, expected: [
        Dose('115 mg 12 hrly'),
        PODose(
          '60 mg 12 hrly\n' +
          '2 ml (125mg/5ml) 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.days(8),
    tests: [
      {weight:  1.66, expected: [
        Dose('85 mg 8 hrly'),
        PODose(
          '25 mg 8 hrly\n' +
          '1 ml (125mg/5ml) 8 hrly'),
      ]},
      {weight:  1.81, expected: [
        Dose('90 mg 8 hrly'),
        PODose(
          '25 mg 8 hrly\n' +
          '1 ml (125mg/5ml) 8 hrly'),
      ]},
      {weight:  2.72, expected: [
        Dose('135 mg 8 hrly'),
        PODose(
          '40 mg 8 hrly\n' +
          '2.5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BC (250mg) tablet 8 hrly'),
      ]},
    ],
  },
  {
    age: Time.weeks(4),
    tests: [
      {weight:  0.63, expected: [
        Dose('30 mg 8 hrly'),
        PODose(
          '10 mg 8 hrly\n' +
          '0.5 ml (125mg/5ml) 8 hrly'),
      ]},
      {weight:  1.50, expected: [
        Dose('75 mg 8 hrly'),
        PODose(
          '25 mg 8 hrly\n' +
          '1 ml (125mg/5ml) 8 hrly'),
      ]},
      {weight:  2.11, expected: [
        Dose('105 mg 8 hrly'),
        PODose(
          '30 mg 8 hrly\n' +
          '1 ml (125mg/5ml) 8 hrly'),
      ]},
      {weight:  3.50, expected: [
        Dose('175 mg 8 hrly'),
        PODose(
          '55 mg 8 hrly\n' +
          '2.5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BC (250mg) tablet 8 hrly'),
      ]},
    ],
  },
  {
    age: Time.months(1),
    tests: [
      {weight:  3.47, expected: [
        Dose('175 mg 8 hrly'),
        PODose(
          '50 mg 8 hrly\n' +
          '2.5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BC (250mg) tablet 8 hrly'),
      ]},
      {weight:  5.10, expected: [
        Dose('255 mg 8 hrly'),
        PODose(
          '75 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BC (250mg) tablet 8 hrly'),
      ]},
      {weight:  5.54, expected: [
        Dose('275 mg 8 hrly'),
        PODose(
          '85 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BC (250mg) tablet 8 hrly'),
      ]},
      {weight:  6.10, expected: [
        Dose('305 mg 8 hrly'),
        PODose(
          '90 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BD (250mg) tablet 8 hrly'),
      ]},
    ],
  },
  {
    age: Time.years(2),
    tests: [ // ETAT table
      {weight:  3.00, expected: [
        Dose('150 mg 8 hrly'),
        PODose(
          '45 mg 8 hrly\n' +
          '2.5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BC (250mg) tablet 8 hrly'),
      ]},
      {weight:  4.00, expected: [
        Dose('200 mg 8 hrly'),
        PODose(
          '60 mg 8 hrly\n' +
          '2.5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BC (250mg) tablet 8 hrly'),
      ]},
      {weight:  5.00, expected: [
        Dose('250 mg 8 hrly'),
        PODose(
          '75 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BC (250mg) tablet 8 hrly'),
      ]},
      {weight:  6.00, expected: [
        Dose('300 mg 8 hrly'),
        PODose(
          '90 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BD (250mg) tablet 8 hrly'),
      ]},
      {weight:  7.00, expected: [
        Dose('350 mg 8 hrly'),
        PODose(
          '105 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BD (250mg) tablet 8 hrly'),
      ]},
      {weight:  8.00, expected: [
        Dose('400 mg 8 hrly'),
        PODose(
          '120 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BD (250mg) tablet 8 hrly'),
      ]},
      {weight:  9.00, expected: [
        Dose('450 mg 8 hrly'),
        PODose(
          '135 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BD (250mg) tablet 8 hrly'),
      ]},
      {weight: 10.00, expected: [
        Dose('500 mg 8 hrly'),
        PODose(
          '150 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 11.00, expected: [
        Dose('550 mg 8 hrly'),
        PODose(
          '165 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 12.00, expected: [
        Dose('600 mg 8 hrly'),
        PODose(
          '180 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 13.00, expected: [
        Dose('650 mg 8 hrly'),
        PODose(
          '195 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 14.00, expected: [
        Dose('700 mg 8 hrly'),
        PODose(
          '210 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 15.00, expected: [
        Dose('750 mg 8 hrly'),
        PODose(
          '225 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 16.00, expected: [
        Dose('800 mg 8 hrly'),
        PODose(
          '240 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 17.00, expected: [
        Dose('850 mg 8 hrly'),
        PODose(
          '255 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 18.00, expected: [
        Dose('900 mg 8 hrly'),
        PODose(
          '270 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 19.00, expected: [
        Dose('950 mg 8 hrly'),
        PODose(
          '285 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 20.00, expected: [
        Dose('1,000 mg 8 hrly'),
        PODose(
          '300 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
    ],
  },
  {
    age: Time.years(3),
    tests: [
      {weight:  9.33, expected: [
        Dose('465 mg 8 hrly'),
        PODose(
          '140 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BD (250mg) tablet 8 hrly'),
      ]},
      {weight:  9.50, expected: [
        Dose('475 mg 8 hrly'),
        PODose(
          '145 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '\u00BD (250mg) tablet 8 hrly'),
      ]},
      {weight: 10.07, expected: [
        Dose('505 mg 8 hrly'),
        PODose(
          '150 mg 8 hrly\n' +
          '5 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 12.10, expected: [
        Dose('605 mg 8 hrly'),
        PODose(
          '180 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 15.95, expected: [
        Dose('800 mg 8 hrly'),
        PODose(
          '240 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 19.58, expected: [
        Dose('980 mg 8 hrly'),
        PODose(
          '295 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
      {weight: 24.11, expected: [
        Dose('1,205 mg 8 hrly'),
        PODose(
          '360 mg 8 hrly\n' +
          '10 ml (125mg/5ml) 8 hrly\n' +
          '1 (250mg) tablet 8 hrly'),
      ]},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Flucloxacillin', tests)
