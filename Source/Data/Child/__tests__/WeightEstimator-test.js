'use strict'  

const udef = undefined

const _ = require('lodash')

const {
  Time,
} = require('../../../__tests__/Test-helpers')

jest.unmock('../WeightEstimator')
const WeightEstimator = require('../WeightEstimator')

_.forEach([
  { age:    Time.udefs(), weight: udef, underweight: udef },

  { age:    Time.days(6), weight: udef, underweight: udef },

  { age:   Time.weeks(2), weight:  3.0, underweight: udef },
  { age:   Time.days(21), weight:  3.0, underweight: udef },

  { age:   Time.days(28), weight:  4.0, underweight: udef },
  { age:   Time.weeks(4), weight:  4.0, underweight: udef },
  { age:  Time.months(1), weight:  4.0, underweight: udef },
  { age:   Time.weeks(7), weight:  4.0, underweight: udef },
  { age:   Time.days(55), weight:  4.0, underweight: udef },

  { age:   Time.weeks(8), weight:  5.0, underweight:  3.0 },
  { age:  Time.months(2), weight:  5.0, underweight:  3.0 },
  { age:  Time.weeks(12), weight:  5.0, underweight:  3.0 },
  { age:  Time.weeks(17), weight:  5.0, underweight:  3.0 },

  { age:  Time.weeks(18), weight:  7.0, underweight:  4.0 },
  { age:  Time.months(4), weight:  7.0, underweight:  4.0 },
  { age:  Time.months(6), weight:  7.0, underweight:  4.0 },
  { age:  Time.weeks(30), weight:  7.0, underweight:  4.0 },

  { age:  Time.weeks(31), weight:  9.0, underweight:  5.0 },
  { age:  Time.months(9), weight:  9.0, underweight:  5.0 },

  { age:  Time.weeks(44), weight: 10.0, underweight:  7.0 },
  { age: Time.months(11), weight: 10.0, underweight:  7.0 },
  { age:  Time.weeks(52), weight: 10.0, underweight:  7.0 },

  { age:   Time.years(1), weight: 11.0, underweight:  9.0 },
  { age:  Time.weeks(53), weight: 11.0, underweight:  9.0 },
  { age: Time.months(23), weight: 11.0, underweight:  9.0 },

  { age:   Time.years(2), weight: 13.0, underweight: 10.0 },
  { age: Time.months(35), weight: 13.0, underweight: 10.0 },

  { age:   Time.years(3), weight: 15.0, underweight: 11.0 },
  { age: Time.months(47), weight: 15.0, underweight: 11.0 },

  { age:   Time.years(4), weight: 17.0, underweight: 13.0 },
  { age: Time.months(55), weight: 17.0, underweight: 13.0 },
  { age:   Time.years(5), weight: 17.0, underweight: 13.0 },

  { age: Time.months(61), weight: udef, underweight: udef },
], (x) => {
  describe(`${x.age.text} child`, () => {
    it(`should return for normal weight => ${x.weight} kg`, () => {
      expect(
        WeightEstimator.getEstimate(x.age.month, false)
      ).toBe(!x.weight?undefined:x.weight.toFixed(1))
    })
    it(`should return for under weight => ${x.underweight} kg`, () => {
      expect(
        WeightEstimator.getEstimate(x.age.month, true)
      ).toBe(!x.underweight?undefined:x.underweight.toFixed(1))
    })
  })
})
