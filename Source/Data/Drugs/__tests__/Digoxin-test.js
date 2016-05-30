'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const InitialDose = DrugDose.template({
  heading: 'Initially',
  route: 'PO',
})
const OngoingDose = DrugDose.template({
  heading: 'Then',
  route: 'PO',
})

const tests = [
  {
    age: Time.days(5),
    tests: [
      {weight:  1.28, expected: undefined},
      {weight:  1.81, expected: undefined},
      {weight:  2.31, expected: undefined},
    ],
  },
  {
    age: Time.years(2),
    tests: [
      {weight: 10.01, expected: [
        InitialDose('350 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('100 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 11.11, expected: [
        InitialDose('389 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('111 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 13.37, expected: [
        InitialDose('468 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('134 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 14.63, expected: [
        InitialDose('512 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('146 micrograms\n24 hrly in 1-2 doses'),
      ]},
    ],
  },
  {
    age: Time.years(5),
    tests: [
      {weight: 13.91, expected: [
        InitialDose('348 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('83 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 14.63, expected: [
        InitialDose('366 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('88 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 16.61, expected: [
        InitialDose('415 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('100 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 18.20, expected: [
        InitialDose('455 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('109 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 31.00, expected: [ // not likely!
        InitialDose('750 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('186 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 42.00, expected: [ // really not likely!
        InitialDose('750 micrograms\nin 3 divided doses for 24 hrs'),
        OngoingDose('250 micrograms\n24 hrly in 1-2 doses'),
      ]},
    ],
  },
  {
    age: Time.years(10),
    tests: [
      {weight: 16.91, expected: [
        InitialDose('0.75-1.5 mg\nin 3 divided doses for 24 hrs'),
        OngoingDose('62.5-250 micrograms\n24 hrly in 1-2 doses'),
      ]},
      {weight: 19.11, expected: [
        InitialDose('0.75-1.5 mg\nin 3 divided doses for 24 hrs'),
        OngoingDose('62.5-250 micrograms\n24 hrly in 1-2 doses'),
      ]},
    ],
  },
  {
    age: Time.years(13),
    tests: [
      {weight: 27.21, expected: undefined},
      {weight: 35.22, expected: undefined},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Digoxin', tests)
