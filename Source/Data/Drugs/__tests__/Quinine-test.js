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
  route: 'IV Infusion / IM',
})
const MaintenanceDose = DrugDose.template({
  heading: 'Maintenance',
  route: 'IV Infusion / IM',
})
const OralDose = DrugDose.template({
  additional: 'Quinine Sulphate',
  route: 'PO',
})

const tests = [
  {weight:  0.91, expected: [
    LoadingDose('18 mg stat'),
    MaintenanceDose('9 mg 8 hrly'),
  ]},
  {weight:  2.52, expected: [
    LoadingDose('50 mg stat'),
    MaintenanceDose('25 mg 8 hrly'),
    OralDose('\u00BC (200mg) tablet 8 hrly'),
  ]},
  {weight:  5.11, expected: [
    LoadingDose('102 mg stat'),
    MaintenanceDose('51 mg 8 hrly'),
    OralDose('\u00BC (200mg) tablet 8 hrly'),
  ]},
  {weight:  7.77, expected: [
    LoadingDose('155 mg stat'),
    MaintenanceDose('78 mg 8 hrly'),
    OralDose('\u00BD (200mg) tablet 8 hrly'),
  ]},
  {weight: 14.41, expected: [
    LoadingDose('288 mg stat'),
    MaintenanceDose('144 mg 8 hrly'),
    OralDose('1 (200mg) tablet 8 hrly'),
  ]},
  {weight: 19.54, expected: [
    LoadingDose('391 mg stat'),
    MaintenanceDose('195 mg 8 hrly'),
    OralDose('1\u00BC (200mg) tablets 8 hrly'),
  ]},
  {weight: 20.01, expected: [
    LoadingDose('400 mg stat'),
    MaintenanceDose('200 mg 8 hrly'),
    OralDose('1\u00BC (200mg) tablets 8 hrly'),
  ]},
  {weight: 22.88, expected: [
    LoadingDose('458 mg stat'),
    MaintenanceDose('229 mg 8 hrly'),
    OralDose('1\u00BD (200mg) tablets 8 hrly'),
  ]},

  // ETAT table
  {weight:  3.00, expected: [
    LoadingDose('60 mg stat'),
    MaintenanceDose('30 mg 8 hrly'),
    OralDose('\u00BC (200mg) tablet 8 hrly'),
  ]},
  {weight:  4.00, expected: [
    LoadingDose('80 mg stat'),
    MaintenanceDose('40 mg 8 hrly'),
    OralDose('\u00BC (200mg) tablet 8 hrly'),
  ]},
  {weight:  5.00, expected: [
    LoadingDose('100 mg stat'),
    MaintenanceDose('50 mg 8 hrly'),
    OralDose('\u00BC (200mg) tablet 8 hrly'),
  ]},
  {weight:  6.00, expected: [
    LoadingDose('120 mg stat'),
    MaintenanceDose('60 mg 8 hrly'),
    OralDose('\u00BD (200mg) tablet 8 hrly'),
  ]},
  {weight:  7.00, expected: [
    LoadingDose('140 mg stat'),
    MaintenanceDose('70 mg 8 hrly'),
    OralDose('\u00BD (200mg) tablet 8 hrly'),
  ]},
  {weight:  8.00, expected: [
    LoadingDose('160 mg stat'),
    MaintenanceDose('80 mg 8 hrly'),
    OralDose('\u00BD (200mg) tablet 8 hrly'),
  ]},
  {weight:  9.00, expected: [
    LoadingDose('180 mg stat'),
    MaintenanceDose('90 mg 8 hrly'),
    OralDose('\u00BD (200mg) tablet 8 hrly'),
  ]},
  {weight: 10.00, expected: [
    LoadingDose('200 mg stat'),
    MaintenanceDose('100 mg 8 hrly'),
    OralDose('\u00BE (200mg) tablet 8 hrly'),
  ]},
  {weight: 11.00, expected: [
    LoadingDose('220 mg stat'),
    MaintenanceDose('110 mg 8 hrly'),
    OralDose('\u00BE (200mg) tablet 8 hrly'),
  ]},
  {weight: 12.00, expected: [
    LoadingDose('240 mg stat'),
    MaintenanceDose('120 mg 8 hrly'),
    OralDose('\u00BE (200mg) tablet 8 hrly'),
  ]},
  {weight: 13.00, expected: [
    LoadingDose('260 mg stat'),
    MaintenanceDose('130 mg 8 hrly'),
    OralDose('\u00BE (200mg) tablet 8 hrly'),
  ]},
  {weight: 14.00, expected: [
    LoadingDose('280 mg stat'),
    MaintenanceDose('140 mg 8 hrly'),
    OralDose('\u00BE (200mg) tablet 8 hrly'),
  ]},
  {weight: 15.00, expected: [
    LoadingDose('300 mg stat'),
    MaintenanceDose('150 mg 8 hrly'),
    OralDose('1 (200mg) tablet 8 hrly'),
  ]},
  {weight: 16.00, expected: [
    LoadingDose('320 mg stat'),
    MaintenanceDose('160 mg 8 hrly'),
    OralDose('1 (200mg) tablet 8 hrly'),
  ]},
  {weight: 17.00, expected: [
    LoadingDose('340 mg stat'),
    MaintenanceDose('170 mg 8 hrly'),
    OralDose('1 (200mg) tablet 8 hrly'),
  ]},
  {weight: 18.00, expected: [
    LoadingDose('360 mg stat'),
    MaintenanceDose('180 mg 8 hrly'),
    OralDose('1 (200mg) tablet 8 hrly'),
  ]},
  {weight: 19.00, expected: [
    LoadingDose('380 mg stat'),
    MaintenanceDose('190 mg 8 hrly'),
    OralDose('1\u00BC (200mg) tablets 8 hrly'),
  ]},
  {weight: 20.00, expected: [
    LoadingDose('400 mg stat'),
    MaintenanceDose('200 mg 8 hrly'),
    OralDose('1\u00BC (200mg) tablets 8 hrly'),
  ]},
]

TestIterators.Weight.MultiExpected('Quinine', tests)
