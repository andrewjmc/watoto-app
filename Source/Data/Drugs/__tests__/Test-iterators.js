'use strict'

const _ = require('lodash')

jest.unmock('./Test-helpers')
const TestHelpers = require('./Test-helpers')

var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const AgeWeightOneExpected = (drugFile, tests) => {
  jest.unmock(`../${drugFile}`)
  var Drug = require(`../${drugFile}`)
  _.forEach(tests, (x) => {
    describe(`${Drug.name} - ${x.age.text} child`, () => {
      _.forEach(x.tests, (y) => {
        var child = Child.create({
          ageRaw: x.age.month,
          weightRaw: y.weight,
        })
        it(`should return for ${y.weight} kg => ${DrugDose.toString(y.expected)}`, () => {
          expect(
            Drug.calculate(child)
          ).toEqual(y.expected)
        })
      })
    })
  })
}

const AgeWeightMultiExpected = (drugFile, tests) => {
  jest.unmock(`../${drugFile}`)
  var Drug = require(`../${drugFile}`)
  _.forEach(tests, (x) => {
    describe(`${Drug.name} - ${x.age.text} child`, () => {
      _.forEach(x.tests, (y) => {
        var child = Child.create({
          ageRaw: x.age.month,
          weightRaw: y.weight,
        })
        var actual = Drug.calculate(child)
        if (!_.isArray(actual)) actual = [ actual ]
        if (!_.isArray(y.expected)) y.expected = [ y.expected ]
        if (actual.length != y.expected.length) {
          it(`should return for ${child.weight} kg the same number of results`, () => {
            expect(actual.length)
              .toBe(y.expected.length)
          })
        }
        _.forEach(actual, (z, i) => {
          it(`should return for ${child.weight} kg => ${DrugDose.toString(y.expected[i])}`, () => {
            expect(actual[i])
              .toEqual(y.expected[i])
          })
        })
      })
    })
  })
}

const AgeOneExpected = (drugFile, tests) => {
  jest.unmock(`../${drugFile}`)
  var Drug = require(`../${drugFile}`)
  _.forEach(tests, (x) => {
    describe(`${Drug.name} - ${x.age.text} child`, () => {
      var child = Child.create({
        ageRaw: x.age.month,
      })
      it(`should return => ${DrugDose.toString(x.expected)}`, () => {
        expect(
          Drug.calculate(child)
        ).toEqual(x.expected)
      })
    })
  })
}

const AgeMultiExpected = (drugFile, tests) => {
  jest.unmock(`../${drugFile}`)
  var Drug = require(`../${drugFile}`)
  _.forEach(tests, (x) => {
    describe(`${Drug.name} - ${x.age.text} child`, () => {
      var child = Child.create({
        ageRaw: x.age.month,
      })
      var actual = Drug.calculate(child)
      if (!_.isArray(actual)) actual = [ actual ]
      if (!_.isArray(x.expected)) x.expected = [ x.expected ]
      if (actual.length != x.expected.length) {
        it('should return the same number of results', () => {
          expect(actual.length)
            .toBe(x.expected.length)
        })
      }
      _.forEach(actual, (y, i) => {
        it(`should return => ${DrugDose.toString(x.expected[i])}`, () => {
          expect(actual[i])
            .toEqual(x.expected[i])
        })
      })
    })
  })
}

const WeightOneExpected = (drugFile, tests) => {
  jest.unmock(`../${drugFile}`)
  var Drug = require(`../${drugFile}`)
  describe(`${Drug.name}`, () => {
    _.forEach(tests, (x) => {
      var child = Child.create({
        weightRaw: x.weight,
      })
      it(`should return for ${child.weight} kg => ${DrugDose.toString(x.expected)}`, () => {
        expect(
          Drug.calculate(child)
        ).toEqual(x.expected)
      })
    })
  })
}

const WeightMultiExpected = (drugFile, tests) => {
  jest.unmock(`../${drugFile}`)
  var Drug = require(`../${drugFile}`)
  describe(`${Drug.name}`, () => {
    _.forEach(tests, (x) => {
      var child = Child.create({
        weightRaw: x.weight,
      })
      var actual = Drug.calculate(child)
      if (!_.isArray(actual)) actual = [ actual ]
      if (!_.isArray(x.expected)) x.expected = [ x.expected ]
      if (actual.length != x.expected.length) {
        it(`should return for ${child.weight} kg the same number of results`, () => {
          expect(actual.length)
            .toBe(x.expected.length)
        })
      }
      _.forEach(actual, (y, i) => {
        it(`should return for ${child.weight} kg => ${DrugDose.toString(x.expected[i])}`, () => {
          expect(actual[i])
            .toEqual(x.expected[i])
        })
      })
    })
  })
}

const OneExpected = (drugFile, tests) => {
  jest.unmock(`../${drugFile}`)
  var Drug = require(`../${drugFile}`)
  _.forEach(tests, (x) => {
    describe(`${Drug.name}`, () => {
      var child = Child.create()
      it(`should return => ${DrugDose.toString(x.expected)}`, () => {
        expect(
          Drug.calculate(child)
        ).toEqual(x.expected)
      })
    })
  })
}

const MultiExpected = (drugFile, tests) => {
  jest.unmock(`../${drugFile}`)
  var Drug = require(`../${drugFile}`)
  _.forEach(tests, (x) => {
    describe(`${Drug.name}`, () => {
      var child = Child.create()
      var actual = Drug.calculate(child)
      if (!_.isArray(actual)) actual = [ actual ]
      if (!_.isArray(x.expected)) x.expected = [ x.expected ]
      if (actual.length != x.expected.length) {
        it('should return the same number of results', () => {
          expect(actual.length)
            .toBe(x.expected.length)
        })
      }
      _.forEach(actual, (y, i) => {
        it(`should return => ${DrugDose.toString(x.expected[i])}`, () => {
          expect(actual[i])
            .toEqual(x.expected[i])
        })
      })
    })
  })
}

module.exports = {
  AgeWeight: {
    OneExpected: AgeWeightOneExpected,
    MultiExpected: AgeWeightMultiExpected,
  },
  Age: {
    OneExpected: AgeOneExpected,
    MultiExpected: AgeMultiExpected,
  },
  Weight: {
    OneExpected: WeightOneExpected,
    MultiExpected: WeightMultiExpected,
  },
  OneExpected: OneExpected,
  MultiExpected: MultiExpected,
}
