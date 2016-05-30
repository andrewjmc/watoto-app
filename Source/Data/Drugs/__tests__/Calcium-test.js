'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const IVDose = DrugDose.template({
  heading: 'Symptomatic Hypocalcemia\n(Tetany/Convulsions)',
  route: 'IV (Bolus then Infusion)',
})
const PODose = DrugDose.template({
  heading: 'Mild Hypocalcemia',
  route: 'PO',
})

const tests = [
  {weight:  0.52, expected: [
    IVDose('0.26 ml (0.06 mmol) bolus\nof 10% calcium gluconate\nover 5-10 min',{additional:'Then continuous infusion\n2.2 ml (0.5 mmol) over 24 hr'}),
    PODose('26 mg 24 hrly\nof elemental calcium\nin 4 divided doses'),
  ]},
  {weight:  1.98, expected: [
    IVDose('1 ml (0.23 mmol) bolus\nof 10% calcium gluconate\nover 5-10 min',{additional:'Then continuous infusion\n8.5 ml (2 mmol) over 24 hr'}),
    PODose('99 mg 24 hrly\nof elemental calcium\nin 4 divided doses'),
  ]},
  {weight:  2.01, expected: [
    IVDose('1 ml (0.23 mmol) bolus\nof 10% calcium gluconate\nover 5-10 min',{additional:'Then continuous infusion\n8.7 ml (2 mmol) over 24 hr'}),
    PODose('100 mg 24 hrly\nof elemental calcium\nin 4 divided doses'),
  ]},
  {weight:  4.44, expected: [
    IVDose('2.2 ml (0.5 mmol) bolus\nof 10% calcium gluconate\nover 5-10 min',{additional:'Then continuous infusion\n19 ml (4.4 mmol) over 24 hr'}),
    PODose('222 mg 24 hrly\nof elemental calcium\nin 4 divided doses'),
  ]},
  {weight:  8.25, expected: [
    IVDose('4.1 ml (1 mmol) bolus\nof 10% calcium gluconate\nover 5-10 min',{additional:'Then continuous infusion\n36 ml (8.3 mmol) over 24 hr'}),
    PODose('413 mg 24 hrly\nof elemental calcium\nin 4 divided doses'),
  ]},
  {weight: 12.75, expected: [
    IVDose('6.4 ml (1.5 mmol) bolus\nof 10% calcium gluconate\nover 5-10 min',{additional:'Then continuous infusion\n38 ml (8.8 mmol) over 24 hr'}),
    PODose('638 mg 24 hrly\nof elemental calcium\nin 4 divided doses'),
  ]},
  {weight: 18.33, expected: [
    IVDose('9.2 ml (2.1 mmol) bolus\nof 10% calcium gluconate\nover 5-10 min',{additional:'Then continuous infusion\n38 ml (8.8 mmol) over 24 hr'}),
    PODose('916 mg 24 hrly\nof elemental calcium\nin 4 divided doses'),
  ]},
  {weight: 21.50, expected: [
    IVDose('11 ml (2.5 mmol) bolus\nof 10% calcium gluconate\nover 5-10 min',{additional:'Then continuous infusion\n38 ml (8.8 mmol) over 24 hr'}),
    PODose('1,075 mg 24 hrly\nof elemental calcium\nin 4 divided doses'),
  ]},
]

TestIterators.Weight.MultiExpected('Calcium', tests)
