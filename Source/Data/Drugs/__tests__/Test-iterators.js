'use strict'

const _ = require('lodash')

jest.unmock('./Test-helpers')
const TestHelpers = require('./Test-helpers')

var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const AgeWeightUndefinedTest = {
  age: Time.udef(),
  tests: [
    {weight: undefined, expected: undefined},
    {weight: 1, expected: undefined},
  ],
}
const AgeUndefinedTest = {
  age: Time.udef(),
  expected: undefined,
}
const WeightUndefinedTest = {
  weight: undefined,
  expected: undefined,
}
const UndefinedTest = {
  expected: undefined,
}

const AgeWeightOneExpected = (drugFile, tests) => {
  tests = _.cloneDeep(tests)
  tests.push(AgeWeightUndefinedTest)

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
  tests = _.cloneDeep(tests)
  tests.push(AgeWeightUndefinedTest)

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
  tests = _.cloneDeep(tests)
  tests.push(AgeUndefinedTest)

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
  tests = _.cloneDeep(tests)
  tests.push(AgeUndefinedTest)

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
  tests = _.cloneDeep(tests)
  tests.push(WeightUndefinedTest)

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
  tests = _.cloneDeep(tests)
  tests.push(WeightUndefinedTest)

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
  tests = _.cloneDeep(tests)
  tests.push(UndefinedTest)

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
  tests = _.cloneDeep(tests)
  tests.push(UndefinedTest)

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
