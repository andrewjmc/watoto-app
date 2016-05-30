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

const PO = DrugDose.template({
  route: 'PO',
})
const MildInfecPO = DrugDose.template({
  heading: 'Mild Infections',
  route: 'PO',
}, additionalDecorator)
const SevereInfecPO = DrugDose.template({
  heading: 'Pneumonia & Severe Infections',
  route: 'PO',
}, additionalDecorator)

const tests = [
  {
    age: Time.days(3),
    tests: [ // ETAT table
      {weight: 2.0, expected: PO(
        '50 mg 12 hrly\n' +
        '2 ml (125mg/5ml) 12 hrly')},
      {weight: 2.5, expected: PO(
        '63 mg 12 hrly\n' +
        '3 ml (125mg/5ml) 12 hrly')},
      {weight: 3.0, expected: PO(
        '75 mg 12 hrly\n' +
        '3 ml (125mg/5ml) 12 hrly')},
      {weight: 4.0, expected: PO(
        '100 mg 12 hrly\n' +
        '4 ml (125mg/5ml) 12 hrly')},
    ],
  },
  {
    age: Time.days(4),
    tests: [ // Others
      {weight: 1.51, expected: PO(
        '38 mg 12 hrly\n' +
        '2 ml (125mg/5ml) 12 hrly')},
      {weight: 2.32, expected: PO(
        '58 mg 12 hrly\n' +
        '2 ml (125mg/5ml) 12 hrly')},
      {weight: 3.96, expected: PO(
        '99 mg 12 hrly\n' +
        '4 ml (125mg/5ml) 12 hrly')},
      {weight: 4.72, expected: PO(
        '118 mg 12 hrly\n' +
        '5 ml (125mg/5ml) 12 hrly')},
    ],
  },
  {
    age: Time.months(3),
    tests: [ // ETAT table
      {weight:  3.0, expected: [
        MildInfecPO(
          '75 mg 12 hrly\n' +
          '4 ml (125mg/5ml) 12 hrly'),
        SevereInfecPO(
          '120-135 mg 12 hrly\n' +
          '5 ml (125mg/5ml) 12 hrly\n' +
          '2.5 ml (250mg/5ml) 12 hrly\n' +
          '\u00BD (250mg) tablet 12 hrly'),
      ]},
      {weight:  4.0, expected: [
        MildInfecPO(
          '100 mg 12 hrly\n' +
          '4 ml (125mg/5ml) 12 hrly'),
        SevereInfecPO(
          '160-180 mg 12 hrly\n' +
          '7.5 ml (125mg/5ml) 12 hrly\n' +
          '3.75 ml (250mg/5ml) 12 hrly\n' +
          '\u00BD (250mg) tablet 12 hrly'),
      ]},
      {weight:  5.0, expected: [
        MildInfecPO(
          '125 mg 12 hrly\n' +
          '6 ml (125mg/5ml) 12 hrly'),
        SevereInfecPO(
          '200-225 mg 12 hrly\n' +
          '10 ml (125mg/5ml) 12 hrly\n' +
          '5 ml (250mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
      ]},
      {weight:  6.0, expected: [
        MildInfecPO(
          '150 mg 12 hrly\n' +
          '6 ml (125mg/5ml) 12 hrly'),
        SevereInfecPO(
          '240-270 mg 12 hrly\n' +
          '10 ml (125mg/5ml) 12 hrly\n' +
          '5 ml (250mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
      ]},
      {weight:  7.0, expected: [
        MildInfecPO(
          '175 mg 12 hrly\n' +
          '8 ml (125mg/5ml) 12 hrly'),
        SevereInfecPO(
          '280-315 mg 12 hrly\n' +
          '7.5 ml (250mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
      ]},
      {weight:  8.0, expected: [
        MildInfecPO(
          '200 mg 12 hrly\n' +
          '8 ml (125mg/5ml) 12 hrly'),
        SevereInfecPO(
          '320-360 mg 12 hrly\n' +
          '7.5 ml (250mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
      ]},
      {weight:  9.0, expected: [
        MildInfecPO(
          '225 mg 12 hrly\n' +
          '8 ml (125mg/5ml) 12 hrly'),
        SevereInfecPO(
          '360-405 mg 12 hrly\n' +
          '7.5 ml (250mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
      ]},
      {weight: 10.0, expected: [
        MildInfecPO(
          '250 mg 12 hrly\n' +
          '12 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '400-450 mg 12 hrly\n' +
          '10 ml (250mg/5ml) 12 hrly\n' +
          '2 (250mg) tablets 12 hrly'),
      ]},
      {weight: 11.0, expected: [
        MildInfecPO(
          '275 mg 12 hrly\n' +
          '12 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '440-495 mg 12 hrly\n' +
          '10 ml (250mg/5ml) 12 hrly\n' +
          '2 (250mg) tablets 12 hrly'),
      ]},
      {weight: 12.0, expected: [
        MildInfecPO(
          '300 mg 12 hrly\n' +
          '12 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '480-540 mg 12 hrly\n' +
          '10 ml (250mg/5ml) 12 hrly\n' +
          '2 (250mg) tablets 12 hrly'),
      ]},
      {weight: 13.0, expected: [
        MildInfecPO(
          '325 mg 12 hrly\n' +
          '12 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '520-585 mg 12 hrly\n' +
          '12.5 ml (250mg/5ml) 12 hrly\n' +
          '2 (250mg) tablets 12 hrly'),
      ]},
      {weight: 14.0, expected: [
        MildInfecPO(
          '350 mg 12 hrly\n' +
          '12 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '560-630 mg 12 hrly\n' +
          '12.5 ml (250mg/5ml) 12 hrly\n' +
          '3 (250mg) tablets 12 hrly'),
      ]},
      {weight: 15.0, expected: [
        MildInfecPO(
          '375 mg 12 hrly\n' +
          '15 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '600-675 mg 12 hrly\n' +
          '12.5 ml (250mg/5ml) 12 hrly\n' +
          '3 (250mg) tablets 12 hrly'),
      ]},
      {weight: 16.0, expected: [
        MildInfecPO(
          '400 mg 12 hrly\n' +
          '15 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '640-720 mg 12 hrly\n' +
          '3 (250mg) tablets 12 hrly'),
      ]},
      {weight: 17.0, expected: [
        MildInfecPO(
          '425 mg 12 hrly\n' +
          '15 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '680-750 mg 12 hrly\n' +
          '3 (250mg) tablets 12 hrly'),
      ]},
      {weight: 18.0, expected: [
        MildInfecPO(
          '450 mg 12 hrly\n' +
          '15 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '720-750 mg 12 hrly\n' +
          '3 (250mg) tablets 12 hrly'),
      ]},
      {weight: 19.0, expected: [
        MildInfecPO(
          '475 mg 12 hrly\n' +
          '15 ml (125mg/5ml) 12 hrly\n' +
          '1 (250mg) tablet 12 hrly'),
        SevereInfecPO(
          '750 mg 12 hrly\n' +
          '3 (250mg) tablets 12 hrly'),
      ]},
      {weight: 20.0, expected: [
        MildInfecPO(
          '500 mg 12 hrly\n' +
          '15 ml (125mg/5ml) 12 hrly\n' +
          '2 (250mg) tablets 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.months(6),
    tests: [ // Others
      {weight:  1.51, expected: undefined},
      {weight:  2.32, expected: undefined},
    // TODO MORE HERE
      {weight: 21.32, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Amoxicillin', tests)
