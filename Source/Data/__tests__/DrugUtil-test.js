'use strict'  

const _ = require('lodash')

jest.dontMock('../DrugUtil')
const DrugUtil = require('../DrugUtil')

describe('DrugUtil.fractions', () => {
  _.forEach([
    {value:  0.00, expected: '0'},
    {value:  0.25, expected: '\u00BC'},
    {value:  0.50, expected: '\u00BD'},
    {value:  0.75, expected: '\u00BE'},
    {value:  1.00, expected: '1'},
    {value:  1.25, expected: '1\u00BC'},
    {value:  1.50, expected: '1\u00BD'},
    {value:  1.75, expected: '1\u00BE'},
    {value:  2.75, expected: '2\u00BE'},
    {value:  3.25, expected: '3\u00BC'},
    {value:  4.50, expected: '4\u00BD'},
    {value:  5.00, expected: '5'},
    {value:  5.01, expected: '5.01'},
    {value: 10.50, expected: '10\u00BD'},
  ], (x) => {
    it(`should convert ${x.value} => ${x.expected}`, () => {
      expect(
        DrugUtil.fractions(x.value)
      ).toBe(x.expected)
    })
  })
})

describe('DrugUtil.plural', () => {
  _.forEach([
    {value: 0.00, expected: 'tablet'},
    {value: 0.25, expected: 'tablet'},
    {value: 0.50, expected: 'tablet'},
    {value: 0.75, expected: 'tablet'},
    {value: 1.00, expected: 'tablet'},
    {value: 1.25, expected: 'tablets'},
    {value: 1.75, expected: 'tablets'},
    {value: 2.75, expected: 'tablets'},
  ], (x) => {
    it(`should pluralise ${x.value} => ${x.expected}`, () => {
      expect(
        DrugUtil.plural(x.value, 'tablet')
      ).toBe(x.expected)
    })
  })
})

describe('DrugUtil.format', () => {
  _.forEach([
    {value: 0.00,         expected: '0'},
    {value: 0.01,         expected: '0.01'},
    {value: '0.00',       expected: '0'},
    {value: 10.6,         expected: '10.6'},
    {value: 1000.00,      expected: '1,000'},
    {value: 1000.01,      expected: '1,000.01'},
    {value: '1000.00',    expected: '1,000'},
    {value: 1000000.00,   expected: '1,000,000'},
    {value: '1000000.00', expected: '1,000,000'},
  ], (x) => {
    it(`should format ${x.value} => ${x.expected}`, () => {
      expect(
        DrugUtil.format(x.value)
      ).toBe(x.expected)
    })
  })
})

describe('DrugUtil.dp', () => {
  _.forEach([
    {value: ['string'], expected: undefined},
    {value: [0.044, 2], expected: '0.04'},
    {value: [0.056, 2], expected: '0.06'},
    {value: [0.101, 1], expected: '0.1'},
    {value: [0.251, 1], expected: '0.3'},
    {value: [0.555, 1], expected: '0.6'},
    {value: [1.234, 0], expected: '1'},
    {value: [(20.01 * 2.4) / (60/3), 1], expected: '2.4'}, // float bug
    {value: [2.4012000000000002, 1], expected: '2.4'}, // float bug
  ], (x) => {
    it(`should format ${x.value[0]} to ${x.value[1]} dp => ${x.expected}`, () => {
      expect(
        DrugUtil.dp(...x.value)
      ).toBe(x.expected)
    })
  })
})

// DrugUtil.dpTiers
_.forEach([
  {
    config: ['string'],
    tests: [
      {value: 1, expected: undefined},
    ],
  },
  {
    config: [{}],
    tests: [
      {value: 1, expected: '1'},
    ],
  },
  {
    config: [{}, {otherwise: 1}],
    tests: [
      {value: 1, expected: '1'},
      {value: 1.1, expected: '1.1'},
    ],
  },
  {
    config: [{10:0}, {otherwise: 1}],
    tests: [
      {value: 9.85, expected: '10'},
      {value: 10, expected: '10'},
      {value: 10.55, expected: '10.6'},
    ],
  },
  {
    config: [{0.1:2, 1.0:1}],
    tests: [
      {value: 0.044, expected: '0.04'},
      {value: 0.056, expected: '0.06'},
      {value: 0.101, expected: '0.1'},
      {value: 0.251, expected: '0.3'},
      {value: 0.555, expected: '0.6'},
      {value: 1.234, expected: '1'},
    ],
  },
  {
    config: [{0.5:2, 5:1, 7:0}, {otherwise: 1}],
    tests: [
      {value: 0.44, expected: '0.44'},
      {value: 0.56, expected: '0.6'},
      {value: 2.53, expected: '2.5'},
      {value: 5.11, expected: '5'},
      {value: 7.23, expected: '7.2'},
    ],
  },
], (x) => {
  describe(`DrugUtil.dpTiers - ${JSON.stringify(x.config)}`, () => {
    _.forEach(x.tests, (y) => {
      it(`should format ${y.value} => ${y.expected}`, () => {
        expect(
          DrugUtil.dpTiers(y.value, ...x.config)
        ).toBe(y.expected)
      })
    })
  })
})

describe('DrugUtil.numberStep', () => {
  _.forEach([
    {value: [ 'string' ], expected: undefined},
    {value: [ 8.00, 2.50], expected: 7.50},
    {value: [ 0.30, 0.25], expected: 0.25},
    {value: [ 0.20, {0.5:0.25,1:0.5}, {otherwise: 1}], expected: 0.25},
    {value: [ 0.45, {0.5:0.25,1:0.5}, {otherwise: 1}], expected: 0.50},
    {value: [ 0.74, {0.5:0.25,1:0.5}, {otherwise: 1}], expected: 0.50},
    {value: [ 0.76, {0.5:0.25,1:0.5}, {otherwise: 1}], expected: 1.00},
    {value: [ 1.20, {0.5:0.25,1:0.5}, {otherwise: 1}], expected: 1.00},
    {value: [ 1.20, {0.5:0.25,1:0.5}, {otherwise: 2}], expected: 2.00},
    {value: [ 60000, 25000], expected: 50000},
    {value: [ 70000, 25000], expected: 75000},
    {value: [ 0.45, 0.25, {round: 1}], expected: 0.50},
    {value: [ 0.45, 0.25, {round: 0}], expected: 0.25},
    {value: [ 0.45, 0.25, {round: 3}], expected: 0.50},
    {value: [ 0.55, 0.25, {round: 1}], expected: 0.50},
    {value: [ 0.55, 0.25, {round: 0}], expected: 0.50},
    {value: [ 0.55, 0.25, {round: 3}], expected: 0.75},
    {value: [ (20.01 * 2.4) / (60/3), 0.1], expected: 2.4}, // float bug
    {value: [ 2.4012000000000002, 0.1], expected: 2.4}, // float bug
  ], (x) => {
    it(`should step ${x.value[0]} by ${JSON.stringify(x.value[1])} => ${x.expected}`, () => {
      expect(
        DrugUtil.numberStep(...x.value)
      ).toBe(x.expected)
    })
  })
})
