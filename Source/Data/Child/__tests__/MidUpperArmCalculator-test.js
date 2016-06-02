'use strict'  

const udef = undefined

const _ = require('lodash')

const {
  Time,
} = require('../../../__tests__/Test-helpers')

jest.unmock('../MidUpperArmCalculator')
const MidUpperArmCalculator = require('../MidUpperArmCalculator')

_.forEach([
  {muac: udef, expected: udef},
  {muac: 'string', expected: udef},

  {muac:  4.9, expected: udef},
  {muac:  9.3, expected: -3},
  {muac: 11.1, expected: -3},
  {muac: 11.4, expected: -3},
  {muac: 11.5, expected: -2},
  {muac: 12.0, expected: -2},
  {muac: 12.4, expected: -2},
  {muac: 12.5, expected: -1},
  {muac: 13.0, expected: -1},
  {muac: 13.4, expected: -1},
  {muac: 13.5, expected:  0},
  {muac: 14.0, expected:  0},
  {muac: 15.0, expected:  0},
  {muac: 25.0, expected:  0},
  {muac: 30.1, expected:  udef},
], (x) => {
  describe(`MUAC`, () => {
    it(`${x.muac} cm => ${x.expected}`, () => {
      expect(
        MidUpperArmCalculator.getScore(x.muac)
      ).toBe(x.expected)
    })
  })
})
