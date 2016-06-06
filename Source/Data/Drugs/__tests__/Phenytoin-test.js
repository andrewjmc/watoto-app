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
  route: 'IV / PO',
})
const MaintenanceDose = DrugDose.template({
  heading: 'Maintenance',
  route: 'IV / PO',
})

const tests = [
  {
    age: Time.weeks(2),
    tests: [
      {weight: 1.51, expected: [
        LoadingDose('23-30 mg stat', {additional:'IV rate not exceeding 1.5 mg/min'}),
        MaintenanceDose('3.8-7.6 mg 12 hrly'),
      ]},
      {weight: 2.32, expected: [
        LoadingDose('35-46 mg stat', {additional:'IV rate not exceeding 2.3 mg/min'}),
        MaintenanceDose('5.8-12 mg 12 hrly'),
      ]},
      {weight: 3.96, expected: [
        LoadingDose('59-79 mg stat', {additional:'IV rate not exceeding 4 mg/min'}),
        MaintenanceDose('9.9-20 mg 12 hrly'),
      ]},
      {weight: 4.72, expected: [
        LoadingDose('71-94 mg stat', {additional:'IV rate not exceeding 4.7 mg/min'}),
        MaintenanceDose('12-24 mg 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  9.41, expected: [
        LoadingDose('141-188 mg stat', {additional:'IV rate not exceeding 9.4 mg/min'}),
        MaintenanceDose('24-47 mg 12 hrly'),
      ]},
      {weight: 10.22, expected: [
        LoadingDose('153-204 mg stat', {additional:'IV rate not exceeding 10 mg/min'}),
        MaintenanceDose('26-51 mg 12 hrly'),
      ]},
      {weight: 11.90, expected: [
        LoadingDose('179-238 mg stat', {additional:'IV rate not exceeding 12 mg/min'}),
        MaintenanceDose('30-60 mg 12 hrly'),
      ]},
      {weight: 12.21, expected: [
        LoadingDose('183-244 mg stat', {additional:'IV rate not exceeding 12 mg/min'}),
        MaintenanceDose('31-61 mg 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.years(5),
    tests: [
      {weight: 15.11, expected: [
        LoadingDose('227-302 mg stat', {additional:'IV rate not exceeding 15 mg/min'}),
        MaintenanceDose('38-76 mg 12 hrly'),
      ]},
      {weight: 16.84, expected: [
        LoadingDose('253-337 mg stat', {additional:'IV rate not exceeding 17 mg/min'}),
        MaintenanceDose('42-84 mg 12 hrly'),
      ]},
      {weight: 21.12, expected: [
        LoadingDose('317-422 mg stat', {additional:'IV rate not exceeding 21 mg/min'}),
        MaintenanceDose('53-106 mg 12 hrly'),
      ]},
      {weight: 31.00, expected: [
        LoadingDose('465-620 mg stat', {additional:'IV rate not exceeding 31 mg/min'}),
        MaintenanceDose('78-150 mg 12 hrly'),
      ]},
      {weight: 61.00, expected: [
        LoadingDose('915-1,220 mg stat', {additional:'IV rate not exceeding 61 mg/min'}),
        MaintenanceDose('150-150 mg 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.years(13),
    tests: [
      {weight: 20.00, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Phenytoin', tests)
