'use strict'

const udef = undefined

const _ = require('lodash')
require('jasmine-expect')
require('../../../__tests__/Test-matchers')

jest.unmock('../SurfaceAreaCalculator')
const SurfaceAreaCalculator = require('../SurfaceAreaCalculator')

const bsaMostellerEq = 'sqrt((H * W) / 3600)'
const bsaMosteller = (h, w) => {
  return (
    Math.sqrt((h * w) / 3600)
  ).toFixed(2)
}
const bsaMostellerSimplifiedEq = 'sqrt(H * W) / 60'
const bsaMostellerSimplified = (h, w) => {
  return (
    Math.sqrt(w * h) / 60
  ).toFixed(2)
}
const bsaBoydEq = '0.0333 * W^(0.6157 - 0.0188 * log10(W)) * H^0.3'
const bsaBoyd = (h, w) => {
  return (
    0.0333 * Math.pow(w, 0.6157 - 0.0188 * Math.log10(w)) * Math.pow(h, 0.3)
  ).toFixed(2)
}
const bsaCosteffEq = '(4 * W + 7) / (90 + W)'
const bsaCosteff = (h, w) => {
  return (
    (4 * w + 7) / (90 + w)
  ).toFixed(2)
}

_.forEach([
  { args: [   25,  1.9 ], result: udef },
  { args: [   46,  1.9 ], result: 0.16 },
  { args: [   50,  2.5 ], result: 0.19 },
  { args: [   57,  3.9 ], result: 0.25 },
  { args: [   65,  5.9 ], result: 0.33 },
  { args: [   73,  7.9 ], result: 0.40 },
  { args: [   80,  7.5 ], result: 0.41 },
  { args: [   80,  9.0 ], result: 0.45 },
  { args: [   80, 11.2 ], result: 0.50 },
  { args: [   85, 11.2 ], result: 0.51 },
  { args: [   90, 12.8 ], result: 0.57 },
  { args: [  100, 14.1 ], result: 0.63 },
  { args: [  105, 17.6 ], result: 0.72 },
  { args: [  115, 19.2 ], result: 0.78 },
  { args: [  120, 21.5 ], result: 0.85 },
  { args: [  120, 40.1 ], result: udef },
  { args: [  151, 21.5 ], result: udef },

  { args: [ udef,  1.9 ], result: 0.16 },
  { args: [ udef, 11.2 ], result: 0.51 },

  { args: [ udef, 40.1 ], result: udef },
], (x) => {
  if (x.result !== undefined) {
    x.result = x.result.toFixed(2)
  }

  describe(`body surface area for child ${x.args[0]} cm, ${x.args[1]} kg`, () => {
    const actual = SurfaceAreaCalculator.getSurfaceArea(...x.args)

    it(`should calculate to ${x.result} m^2`, () => {
      expect(actual)
        .toBeAfterCleaning(x.result, /^~/)
    })

    if (x.result !== undefined) {
      if (x.args[0]) { // if height provided
        it(`should be exactly as per Mosteller - ${bsaMostellerEq}`, () => {
          expect(actual)
            .toBe(bsaMosteller(...x.args))
        })
        it(`should be exactly as per Mosteller Simplified - ${bsaMostellerSimplifiedEq}`, () => {
          expect(actual)
            .toBe(bsaMostellerSimplified(...x.args))
        })
        it(`should be similar (+/- 0.03 m^2) to Boyd - ${bsaBoydEq}`, () => {
          expect(actual)
            .toBeWithinTolerance(bsaBoyd(...x.args), 0.03)
        })
        it(`should be similar (+/- 0.03 m^2) to Costeff - ${bsaCosteffEq}`, () => {
          expect(actual)
            .toBeWithinTolerance(bsaCosteff(...x.args), 0.03)
        })
      }
      else { // if no height provided
        it('should be prefixed with an approximation', () => {
          expect(actual)
            .toStartWith('~')
        })
        it(`should be exactly as per Costeff - ${bsaCosteffEq}`, () => {
          expect(actual)
            .toBeAfterCleaning(bsaCosteff(...x.args), /^~/)
        })
      }
    }
  })
})
