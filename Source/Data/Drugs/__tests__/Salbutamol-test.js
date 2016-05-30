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
  heading: 'In Hospital Only',
  route: 'IV (over 5 mins)',
})
const IVMax = DrugDose.template({
  heading: 'In Hospital Only',
  additional: 'max 250 microgram / 0.25 mg',
  route: 'IV (over 5 mins)',
})
const Nebulised = DrugDose.template({
  additional: 'up to 3 doses',
  route: 'Nebulised',
})
const Inhaled = DrugDose.template({
  additional: 'up to 3 doses',
  route: 'Inhaler via Spacer',
})

const tests = [
  {
    age: Time.weeks(4),
    tests: [
      {weight:  0.63, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('3 microgram stat'),
      ]},
      {weight:  1.50, expected: [        
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('8 microgram stat'),
      ]},
      {weight:  2.11, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('11 microgram stat'),
      ]},
      {weight:  3.50, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('18 microgram stat'),
      ]},
    ],
  },
  {
    age: Time.years(1),
    tests: [
      {weight:  5.54, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('28 microgram stat'),
      ]},
      {weight:  6.10, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('31 microgram stat'),
      ]},
      {weight:  7.42, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('37 microgram stat'),
      ]},
      {weight:  8.77, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('44 microgram stat'),
      ]},
      {weight: 51.00, expected: [ // seriously not likely!
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IV('250 microgram stat'),
      ]},
    ],
  },
  {
    age: Time.years(3),
    tests: [
      {weight:  9.33, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IVMax('up to 140 microgram stat'),
      ]},
      {weight:  9.51, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IVMax('up to 143 microgram stat'),
      ]},
      {weight: 10.07, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IVMax('up to 151 microgram stat'),
      ]},
      {weight: 12.10, expected: [
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IVMax('up to 182 microgram stat'),
      ]},
      {weight: 17.00, expected: [ // not that likely!
        Nebulised('2.5 mg every 20 min'),
        Inhaled('2-6 puffs every 20 min\n100 microgram per puff'),
        IVMax('up to 250 microgram stat'),
      ]},
    ],
  },
]

TestIterators.AgeWeight.MultiExpected('Salbutamol', tests)
