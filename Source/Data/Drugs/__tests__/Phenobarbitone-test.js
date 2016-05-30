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
  route: 'IM / PO',
})
const MaintenanceDose = DrugDose.template({
  heading: 'Maintenance',
  additional: 'Starting Dose\nFits in Acute Febrile Illness',
})
const MaintenanceHighDose = DrugDose.template({
  additional: 'High Dose\nChronic Therapy',
  route: 'IM / PO',
})

const tests = [
  {
    age: Time.days(5),
    tests: [ 
      {weight: 1.81, expected: [
        LoadingDose('36 mg stat'),
        MaintenanceDose('4.5 mg 24 hrly'),
        MaintenanceHighDose('9 mg 24 hrly'),
      ]},
      {weight: 2.47, expected: [
        LoadingDose('49.5 mg stat'),
        MaintenanceDose('6.25 mg 24 hrly'),
        MaintenanceHighDose('12.5 mg 24 hrly'),
      ]},
      {weight: 3.23, expected: [
        LoadingDose('65 mg stat'),
        MaintenanceDose('8 mg 24 hrly'),
        MaintenanceHighDose('16 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
      ]},
      {weight: 4.43, expected: [
        LoadingDose('89 mg stat'),
        MaintenanceDose('11 mg 24 hrly'),
        MaintenanceHighDose('22 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
      ]},
      {weight: 5.01, expected: [
        LoadingDose('100 mg stat'),
        MaintenanceDose('12.5 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
        MaintenanceHighDose('25 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
      ]},
    ],
  },
  {
    age: Time.months(2),
    tests: [ // ETAT table
      {weight:  2.0, expected: [
        LoadingDose('30 mg stat'),
        MaintenanceDose('5 mg 24 hrly'),
        MaintenanceHighDose('10 mg 24 hrly'),
      ]},
      {weight:  2.5, expected: [
        LoadingDose('37.5 mg stat'),
        MaintenanceDose('6.25 mg 24 hrly'),
        MaintenanceHighDose('12.5 mg 24 hrly'),
      ]},
      {weight:  3.0, expected: [
        LoadingDose('45 mg stat'),
        MaintenanceDose('7.5 mg 24 hrly'),
        MaintenanceHighDose('15 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
      ]},
      {weight:  4.0, expected: [
        LoadingDose('60 mg stat'),
        MaintenanceDose('10 mg 24 hrly'),
        MaintenanceHighDose('20 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
      ]},
      {weight:  5.0, expected: [
        LoadingDose('75 mg stat'),
        MaintenanceDose('12.5 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
        MaintenanceHighDose('25 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
      ]},
      {weight:  6.0, expected: [
        LoadingDose('90 mg stat'),
        MaintenanceDose('15 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
        MaintenanceHighDose('30 mg 24 hrly\n1 (30mg) tablet 24 hrly'),
      ]},
      {weight:  7.0, expected: [
        LoadingDose('105 mg stat'),
        MaintenanceDose('17.5 mg 24 hrly\n\u00BD (30mg) tablet 24 hrly'),
        MaintenanceHighDose('35 mg 24 hrly\n1 (30mg) tablet 24 hrly'),
      ]},
      {weight:  8.0, expected: [
        LoadingDose('120 mg stat'),
        MaintenanceDose('20 mg 24 hrly\n1 (30mg) tablet 24 hrly'),
        MaintenanceHighDose('40 mg 24 hrly\n1 (30mg) tablet 24 hrly'),
      ]},
      {weight:  9.0, expected: [
        LoadingDose('135 mg stat'),
        MaintenanceDose('22.5 mg 24 hrly\n1 (30mg) tablet 24 hrly'),
        MaintenanceHighDose('45 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
      ]},
      {weight: 10.0, expected: [
        LoadingDose('150 mg stat'),
        MaintenanceDose('25 mg 24 hrly\n1 (30mg) tablet 24 hrly'),
        MaintenanceHighDose('50 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
      ]},
      {weight: 11.0, expected: [
        LoadingDose('165 mg stat'),
        MaintenanceDose('27.5 mg 24 hrly\n1 (30mg) tablet 24 hrly'),
        MaintenanceHighDose('55 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
      ]},
      {weight: 12.0, expected: [
        LoadingDose('180 mg stat'),
        MaintenanceDose('30 mg 24 hrly\n1 (30mg) tablet 24 hrly'),
        MaintenanceHighDose('60 mg 24 hrly\n2 (30mg) tablets 24 hrly'),
      ]},
      {weight: 13.0, expected: [
        LoadingDose('195 mg stat'),
        MaintenanceDose('32.5 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
        MaintenanceHighDose('65 mg 24 hrly\n2 (30mg) tablets 24 hrly'),
      ]},
      {weight: 14.0, expected: [
        LoadingDose('210 mg stat'),
        MaintenanceDose('35 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
        MaintenanceHighDose('70 mg 24 hrly\n2 (30mg) tablets 24 hrly'),
      ]},
      {weight: 15.0, expected: [
        LoadingDose('225 mg stat'),
        MaintenanceDose('37.5 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
        MaintenanceHighDose('75 mg 24 hrly\n2\u00BD (30mg) tablets 24 hrly'),
      ]},
      {weight: 16.0, expected: [
        LoadingDose('240 mg stat'),
        MaintenanceDose('40 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
        MaintenanceHighDose('80 mg 24 hrly\n2\u00BD (30mg) tablets 24 hrly'),
      ]},
      {weight: 17.0, expected: [
        LoadingDose('255 mg stat'),
        MaintenanceDose('42.5 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
        MaintenanceHighDose('85 mg 24 hrly\n2\u00BD (30mg) tablets 24 hrly'),
      ]},
      {weight: 18.0, expected: [
        LoadingDose('270 mg stat'),
        MaintenanceDose('45 mg 24 hrly\n1\u00BD (30mg) tablets 24 hrly'),
        MaintenanceHighDose('90 mg 24 hrly\n3 (30mg) tablets 24 hrly'),
      ]},
      {weight: 19.0, expected: [
        LoadingDose('285 mg stat'),
        MaintenanceDose('47.5 mg 24 hrly\n2 (30mg) tablets 24 hrly'),
        MaintenanceHighDose('95 mg 24 hrly\n3 (30mg) tablets 24 hrly'),
      ]},
      {weight: 20.0, expected: [
        LoadingDose('300 mg stat'),
        MaintenanceDose('50 mg 24 hrly\n2 (30mg) tablets 24 hrly'),
        MaintenanceHighDose('100 mg 24 hrly\n3 (30mg) tablets 24 hrly'),
      ]},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Phenobarbitone', tests)
