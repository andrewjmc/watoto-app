'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const TreatmentDose = DrugDose.template({
  heading: 'Treatment',
  additional: '8-12 week low-dose course',
  route: 'PO',
})
const TreatmentDoseIM = DrugDose.template({
  additional: 'Single high-dose course',
  route: 'IM',
})
const MaintenanceDose = DrugDose.template({
  heading: 'Maintenance',
  additional: 'After treatment course',
  route: 'PO',
})

const tests = [
  {age:   Time.weeks(4), expected: [
    TreatmentDose('3,000 u\n(75 microgram) 24 hrly'),
    MaintenanceDose('200-400 u\n(5-10 microgram) 24 hrly'),
  ]},
  {age:  Time.months(2), expected: [
    TreatmentDose('3,000 u\n(75 microgram) 24 hrly'),
    MaintenanceDose('200-400 u\n(5-10 microgram) 24 hrly'),
  ]},
  {age:  Time.months(7), expected: [
    TreatmentDose('6,000 u\n(150 microgram) 24 hrly'),
    TreatmentDoseIM('300,000 u (7.5 mg) stat'),
    MaintenanceDose('400-800 u\n(10-20 microgram) 24 hrly'),
  ]},
  {age:   Time.years(1), expected: [
    TreatmentDose('6,000 u\n(150 microgram) 24 hrly'),
    TreatmentDoseIM('300,000 u (7.5 mg) stat'),
    MaintenanceDose('400-800 u\n(10-20 microgram) 24 hrly'),
  ]},
  {age:   Time.years(3), expected: [
    TreatmentDose('6,000 u\n(150 microgram) 24 hrly'),
    TreatmentDoseIM('300,000 u (7.5 mg) stat'),
    MaintenanceDose('400-800 u\n(10-20 microgram) 24 hrly'),
  ]},
]

TestIterators.Age.MultiExpected('VitaminD', tests)
