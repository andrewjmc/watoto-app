'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const Dose = DrugDose.template({
  route: 'IV / IM',
})

const tests = [
  // ETAT table
  {weight:  3.00, expected:  Dose('9 mg at 0, 12 & 24 hrs', {additional:'0.9 ml (60mg/6ml) IV\n0.45 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight:  4.00, expected: Dose('12 mg at 0, 12 & 24 hrs', {additional:'1.2 ml (60mg/6ml) IV\n0.6 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight:  5.00, expected: Dose('15 mg at 0, 12 & 24 hrs', {additional:'1.5 ml (60mg/6ml) IV\n0.8 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight:  6.00, expected: Dose('18 mg at 0, 12 & 24 hrs', {additional:'1.8 ml (60mg/6ml) IV\n0.9 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight:  7.00, expected: Dose('21 mg at 0, 12 & 24 hrs', {additional:'2.1 ml (60mg/6ml) IV\n1.1 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight:  8.00, expected: Dose('24 mg at 0, 12 & 24 hrs', {additional:'2.4 ml (60mg/6ml) IV\n1.2 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight:  9.00, expected: Dose('27 mg at 0, 12 & 24 hrs', {additional:'2.7 ml (60mg/6ml) IV\n1.4 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 10.00, expected: Dose('30 mg at 0, 12 & 24 hrs', {additional:'3 ml (60mg/6ml) IV\n1.5 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 11.00, expected: Dose('33 mg at 0, 12 & 24 hrs', {additional:'3.3 ml (60mg/6ml) IV\n1.7 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})}, // ETAT = 1.6 ml (60mg/3ml) IM
  {weight: 12.00, expected: Dose('36 mg at 0, 12 & 24 hrs', {additional:'3.6 ml (60mg/6ml) IV\n1.8 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 13.00, expected: Dose('39 mg at 0, 12 & 24 hrs', {additional:'3.9 ml (60mg/6ml) IV\n2 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 14.00, expected: Dose('42 mg at 0, 12 & 24 hrs', {additional:'4.2 ml (60mg/6ml) IV\n2.1 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 15.00, expected: Dose('45 mg at 0, 12 & 24 hrs', {additional:'4.5 ml (60mg/6ml) IV\n2.3 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 16.00, expected: Dose('48 mg at 0, 12 & 24 hrs', {additional:'4.8 ml (60mg/6ml) IV\n2.4 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 17.00, expected: Dose('51 mg at 0, 12 & 24 hrs', {additional:'5.1 ml (60mg/6ml) IV\n2.6 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 18.00, expected: Dose('54 mg at 0, 12 & 24 hrs', {additional:'5.4 ml (60mg/6ml) IV\n2.7 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 19.00, expected: Dose('57 mg at 0, 12 & 24 hrs', {additional:'5.7 ml (60mg/6ml) IV\n2.9 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 20.00, expected: Dose('60 mg at 0, 12 & 24 hrs', {additional:'6 ml (60mg/6ml) IV\n3 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},

  // Others
  {weight:  2.52, expected:  Dose('8 mg at 0, 12 & 24 hrs', {additional:'0.8 ml (60mg/6ml) IV\n0.4 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight:  5.11, expected: Dose('15 mg at 0, 12 & 24 hrs', {additional:'1.5 ml (60mg/6ml) IV\n0.8 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight:  7.77, expected: Dose('23 mg at 0, 12 & 24 hrs', {additional:'2.3 ml (60mg/6ml) IV\n1.2 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 14.41, expected: Dose('43 mg at 0, 12 & 24 hrs', {additional:'4.3 ml (60mg/6ml) IV\n2.2 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 19.54, expected: Dose('59 mg at 0, 12 & 24 hrs', {additional:'5.9 ml (60mg/6ml) IV\n2.9 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 20.01, expected: Dose('48 mg at 0, 12 & 24 hrs', {additional:'4.8 ml (60mg/6ml) IV\n2.4 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
  {weight: 22.88, expected: Dose('55 mg at 0, 12 & 24 hrs', {additional:'5.5 ml (60mg/6ml) IV\n2.7 ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible'})},
]

TestIterators.Weight.OneExpected('Artesunate', tests)
