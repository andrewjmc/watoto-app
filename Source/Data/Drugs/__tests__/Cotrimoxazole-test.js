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
  if (_.replace(x.dose, /[^\n]/g, '').length > 0) {
    x.additional = 'One of the above' + (x.additional ? `\n${x.additional}` : '')
  }
}

const PCPProphylaxis = DrugDose.template({
  heading: 'PCP Prophylaxis',
  route: 'PO',
}, additionalDecorator)
const PCPDose = DrugDose.template({
  heading: 'PCP Treatment',
  additional: 'For 3 weeks',
  route: 'PO',
}, additionalDecorator)
const NonPCPDose = DrugDose.template({
  heading: 'Non-PCP',
  route: 'PO',
}, additionalDecorator)

// PCP (Treatment 8 hrly; Prophylaxis 24 hrly)
// 1-4 kg =>   2.5 ml   1 (120)   1/4 (480)
// 5-8 kg =>   5.0 ml   2 (120)   1/2 (480)
// 9-16 kg => 10.0 ml   -         1 (480)
// 17-50 kg                       2 (480)

// Non-PCP (12 hrly)
// 2-3 kg =>    2.5 ml   1 (120)   1/4 (480)
// 4-10 kg =>   5.0 ml   2 (120)   1/2 (480)
// 11-15 kg =>  7.5 ml   2 (120)   1/2 (480)
// 16-20 kg => 10.0 ml   -         1 (480)

const tests = [
  {
    age: Time.weeks(3),
    tests: [
      {weight: 0.85, expected: undefined},
      {weight: 1.23, expected: [
        PCPDose(
          '2.5 ml (240mg/5ml) 8 hrly\n' +
          '1 (120mg) tablet 8 hrly\n' +
          '\u00BC (480mg) tablet 8 hrly'),
      ]},
      {weight: 2.81, expected: [
        PCPDose(
          '2.5 ml (240mg/5ml) 8 hrly\n' +
          '1 (120mg) tablet 8 hrly\n' +
          '\u00BC (480mg) tablet 8 hrly'),
        NonPCPDose(
          '2.5 ml (240mg/5ml) 12 hrly\n' +
          '1 (120mg) tablet 12 hrly\n' +
          '\u00BC (480mg) tablet 12 hrly'),
      ]},
      {weight: 4.25, expected: [
        PCPDose(
          '2.5 ml (240mg/5ml) 8 hrly\n' +
          '1 (120mg) tablet 8 hrly\n' +
          '\u00BC (480mg) tablet 8 hrly'),
        NonPCPDose(
          '5 ml (240mg/5ml) 12 hrly\n' +
          '2 (120mg) tablets 12 hrly\n' +
          '\u00BD (480mg) tablet 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.months(4),
    tests: [
      {weight:  0.75, expected: undefined},
      {weight:  1.51, expected: [
        PCPProphylaxis(
          '2.5 ml (240mg/5ml) 24 hrly\n' +
          '1 (120mg) tablet 24 hrly\n' +
          '\u00BC (480mg) tablet 24 hrly'),
        PCPDose(
          '2.5 ml (240mg/5ml) 8 hrly\n' +
          '1 (120mg) tablet 8 hrly\n' +
          '\u00BC (480mg) tablet 8 hrly'),
      ]},
      {weight:  2.22, expected: [
        PCPProphylaxis(
          '2.5 ml (240mg/5ml) 24 hrly\n' +
          '1 (120mg) tablet 24 hrly\n' +
          '\u00BC (480mg) tablet 24 hrly'),
        PCPDose(
          '2.5 ml (240mg/5ml) 8 hrly\n' +
          '1 (120mg) tablet 8 hrly\n' +
          '\u00BC (480mg) tablet 8 hrly'),
        NonPCPDose(
          '2.5 ml (240mg/5ml) 12 hrly\n' +
          '1 (120mg) tablet 12 hrly\n' +
          '\u00BC (480mg) tablet 12 hrly'),
      ]},
      {weight:  3.88, expected: [
        PCPProphylaxis(
          '2.5 ml (240mg/5ml) 24 hrly\n' +
          '1 (120mg) tablet 24 hrly\n' +
          '\u00BC (480mg) tablet 24 hrly'),
        PCPDose(
          '2.5 ml (240mg/5ml) 8 hrly\n' +
          '1 (120mg) tablet 8 hrly\n' +
          '\u00BC (480mg) tablet 8 hrly'),
        NonPCPDose(
          '2.5 ml (240mg/5ml) 12 hrly\n' + 
          '1 (120mg) tablet 12 hrly\n' +
          '\u00BC (480mg) tablet 12 hrly'),
      ]},
      {weight:  4.31, expected: [
        PCPProphylaxis(
          '2.5 ml (240mg/5ml) 24 hrly\n' +
          '1 (120mg) tablet 24 hrly\n' +
          '\u00BC (480mg) tablet 24 hrly'),
        PCPDose(
          '2.5 ml (240mg/5ml) 8 hrly\n' +
          '1 (120mg) tablet 8 hrly\n' +
          '\u00BC (480mg) tablet 8 hrly'),
        NonPCPDose(
          '5 ml (240mg/5ml) 12 hrly\n' +
          '2 (120mg) tablets 12 hrly\n' +
          '\u00BD (480mg) tablet 12 hrly'),
      ]},
      {weight:  5.79, expected: [
        PCPProphylaxis(
          '5 ml (240mg/5ml) 24 hrly\n' +
          '2 (120mg) tablets 24 hrly\n' +
          '\u00BD (480mg) tablet 24 hrly'),
        PCPDose(
          '5 ml (240mg/5ml) 8 hrly\n' +
          '2 (120mg) tablets 8 hrly\n' +
          '\u00BD (480mg) tablet 8 hrly'),
        NonPCPDose(
          '5 ml (240mg/5ml) 12 hrly\n' +
          '2 (120mg) tablets 12 hrly\n' +
          '\u00BD (480mg) tablet 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.years(2),
    tests: [
      {weight: 10.81, expected: [
        PCPProphylaxis(
          '10 ml (240mg/5ml) 24 hrly\n' +
          '1 (480mg) tablet 24 hrly'),
        PCPDose(
          '10 ml (240mg/5ml) 8 hrly\n' +
          '1 (480mg) tablet 8 hrly'),
        NonPCPDose(
          '5 ml (240mg/5ml) 12 hrly\n' +
          '2 (120mg) tablets 12 hrly\n' +
          '\u00BD (480mg) tablet 12 hrly'),
      ]},
      {weight: 11.01, expected: [
        PCPProphylaxis(
          '10 ml (240mg/5ml) 24 hrly\n' +
          '1 (480mg) tablet 24 hrly'),
        PCPDose(
          '10 ml (240mg/5ml) 8 hrly\n' +
          '1 (480mg) tablet 8 hrly'),
        NonPCPDose(
          '7.5 ml (240mg/5ml) 12 hrly\n' + 
          '2 (120mg) tablets 12 hrly\n' +
          '\u00BD (480mg) tablet 12 hrly'),
      ]},
      {weight: 15.55, expected: [
        PCPProphylaxis(
          '10 ml (240mg/5ml) 24 hrly\n' +
          '1 (480mg) tablet 24 hrly'),
        PCPDose(
          '10 ml (240mg/5ml) 8 hrly\n' +
          '1 (480mg) tablet 8 hrly'),
        NonPCPDose(
          '7.5 ml (240mg/5ml) 12 hrly\n' +
          '2 (120mg) tablets 12 hrly\n' +
          '\u00BD (480mg) tablet 12 hrly'),
      ]},
      {weight: 16.44, expected: [
        PCPProphylaxis(
          '10 ml (240mg/5ml) 24 hrly\n' +
          '1 (480mg) tablet 24 hrly'),
        PCPDose(
          '10 ml (240mg/5ml) 8 hrly\n' +
          '1 (480mg) tablet 8 hrly'),
        NonPCPDose(
          '10 ml (240mg/5ml) 12 hrly\n' +
          '1 (480mg) tablet 12 hrly'),
      ]},
      {weight: 19.96, expected: [
        PCPProphylaxis(
          '2 (480mg) tablets 24 hrly'),
        PCPDose(
          '2 (480mg) tablets 8 hrly'),
        NonPCPDose(
          '10 ml (240mg/5ml) 12 hrly\n' +
          '1 (480mg) tablet 12 hrly'),
      ]},
      {weight: 21.00, expected: [
        PCPProphylaxis('2 (480mg) tablets 24 hrly'),
        PCPDose('2 (480mg) tablets 8 hrly'),
      ]},
      {weight: 51.00, expected: undefined}, // seriously not likely!
    ]
  },
]

TestIterators.AgeWeight.MultiExpected('Cotrimoxazole', tests)
