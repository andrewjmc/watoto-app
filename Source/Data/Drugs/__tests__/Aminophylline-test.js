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
  route: 'IV (or PR)',
})
const MaintenanceDose = DrugDose.template({
  heading: 'Maintenance',
  route: 'IV / PO',
})

const tests = [
  {
    age: Time.days(3),
    tests: [
      {weight: 1.28, expected: [
        LoadingDose('8 mg over 1 hour'),
        MaintenanceDose('3.2 mg 12 hrly'),
      ]},
      {weight: 1.81, expected: [
        LoadingDose('11 mg over 1 hour'),
        MaintenanceDose('4.5 mg 12 hrly'),
      ]},
      {weight: 3.28, expected: [
        LoadingDose('20 mg over 1 hour'),
        MaintenanceDose('8.2 mg 12 hrly'),
      ]},
    ],
  },
  {
    age: Time.weeks(2),
    tests: [
      {weight:  2.32, expected:  MaintenanceDose('9 mg 12 hrly')},
      {weight:  3.11, expected: MaintenanceDose('12 mg 12 hrly')},
      {weight:  4.80, expected: MaintenanceDose('19 mg 12 hrly')},
    ],
  },
  {
    age: Time.days(27),
    tests: [
      {weight:  3.71, expected: MaintenanceDose('15 mg 12 hrly')},
      {weight:  4.22, expected: MaintenanceDose('17 mg 12 hrly')},
      {weight:  4.99, expected: MaintenanceDose('20 mg 12 hrly')},
    ],
  },
  { // As-per-guidelines; apparently slightly controversial
    age: Time.months(2),
    tests: [
      {weight:  4.75, expected: undefined},
      {weight:  5.51, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Aminophylline', tests)
