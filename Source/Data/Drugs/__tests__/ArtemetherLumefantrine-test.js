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
  route: 'PO',
})

const tests = [
  {weight:  0.52, expected: Dose('\u00BD tablet (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
  {weight:  1.98, expected: Dose('\u00BD tablet (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
  {weight:  2.01, expected: Dose('\u00BD tablet (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
  {weight:  4.44, expected: Dose('\u00BD tablet (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
  {weight:  8.25, expected: Dose('1 tablet (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
  {weight: 12.75, expected: Dose('1 tablet (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
  {weight: 18.33, expected: Dose('2 tablets (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
  {weight: 21.50, expected: Dose('2 tablets (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
  {weight: 27.21, expected: Dose('3 tablets (20+120mg) stat',{additional:'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3'})},
]

TestIterators.Weight.OneExpected('ArtemetherLumefantrine', tests)
