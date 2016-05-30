'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const IV = DrugDose.template({
  route: 'IV',
})
const PO = DrugDose.template({
  route: 'PO',
})

const tests = [
  {
    age: Time.days(3),
    tests: [ // ETAT table
      {weight: 1.00, expected: IV('7.5 mg 12 hrly')},
      {weight: 1.25, expected: IV('10 mg 12 hrly')},
      {weight: 1.50, expected: IV('12.5 mg 12 hrly')},
      {weight: 1.75, expected: IV('12.5 mg 12 hrly')},
      {weight: 2.00, expected: IV('15 mg 12 hrly')},
      {weight: 2.50, expected: IV('20 mg 12 hrly')},
      {weight: 3.00, expected: IV('22.5 mg 12 hrly')},
      {weight: 4.00, expected: IV('30 mg 12 hrly')},
    ],
  },
  {
    age: Time.weeks(4),
    tests: [ // ETAT table
      {weight:  3.00,  expected: IV('20 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight:  4.00,  expected: IV('30 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight:  5.00,  expected: IV('35 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight:  6.00,  expected: IV('45 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight:  7.00,  expected: IV('50 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight:  8.00,  expected: IV('60 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight:  9.00,  expected: IV('65 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 10.00,  expected: IV('75 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 11.00,  expected: IV('80 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 12.00,  expected: IV('90 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 13.00,  expected: IV('95 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 14.00, expected: IV('105 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 15.00, expected: IV('110 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 16.00, expected: IV('120 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 17.00, expected: IV('125 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 18.00, expected: IV('135 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 19.00, expected: IV('140 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight: 20.00, expected: IV('150 mg 12 hrly', {additional:'max 4 grams per 24 hrs'})},

    ],
  },
  {
    age: Time.years(2),
    tests: [ // ETAT table
      {weight:  3.00, expected: IV('20 mg 8 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight:  4.00, expected: IV('30 mg 8 hrly', {additional:'max 4 grams per 24 hrs'})},
      {weight:  5.00, expected: [
        IV('35 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BC (200mg) tablet 8 hrly')
      ]},
      {weight:  6.00, expected: [
        IV('45 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BC (200mg) tablet 8 hrly')
      ]},
      {weight:  7.00, expected: [
        IV('50 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BD (200mg) tablet 8 hrly')
      ]},
      {weight:  8.00, expected: [
        IV('60 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BD (200mg) tablet 8 hrly')
      ]},
      {weight:  9.00, expected: [
        IV('65 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BD (200mg) tablet 8 hrly')
      ]},
      {weight: 10.00, expected: [
        IV('75 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BD (200mg) tablet 8 hrly')
      ]},
      {weight: 11.00, expected: [
        IV('80 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BD (200mg) tablet 8 hrly')
      ]},
      {weight: 12.00, expected: [
        IV('90 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BD (200mg) tablet 8 hrly')
      ]},
      {weight: 13.00, expected: [
        IV('95 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('\u00BD (200mg) tablet 8 hrly')
      ]},
      {weight: 14.00, expected: [
        IV('105 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('1 (200mg) tablet 8 hrly')
      ]},
      {weight: 15.00, expected: [
        IV('110 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('1 (200mg) tablet 8 hrly')
      ]},
      {weight: 16.00, expected: [
        IV('120 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('1 (200mg) tablet 8 hrly')
      ]},
      {weight: 17.00, expected: [
        IV('125 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('1 (200mg) tablet 8 hrly')
      ]},
      {weight: 18.00, expected: [
        IV('135 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('1 (200mg) tablet 8 hrly')
      ]},
      {weight: 19.00, expected: [
        IV('140 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('1 (200mg) tablet 8 hrly')
      ]},
      {weight: 20.00, expected: [
        IV('150 mg 8 hrly', {additional:'max 4 grams per 24 hrs'}),
        PO('1 (200mg) tablet 8 hrly')
      ]},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Metronidazole', tests)
