'use strict'  

const _ = require('lodash')
require('jasmine-expect')

jest.unmock('../WeightHeightCalculator')
const WeightHeightCalculator = require('../WeightHeightCalculator')
const tables = WeightHeightCalculator.tables()

const expectedNumOfTables = 2
const expectedNumOfDeviations = 4

describe('table general checks', () => {
  it(`has ${expectedNumOfTables} tables`, () => {
    expect(
      tables.length
    ).toBe(expectedNumOfTables)
  })
  _.forEach(_.range(expectedNumOfTables), (table) => {
    it(`should confirm that table ${table} is a plain object`, () => {
      expect(
        _.isPlainObject(tables[table])
      ).toBeTrue()
    })
    it(`should have more than 50 entries in table ${table}`, () => {
      expect(
        _.keys(tables[table]).length
      ).toBeGreaterThan(50)
    })
  })
})

describe('table general gender checks', () => {
  _.forEach(_.range(expectedNumOfTables), (table) => {
    _.forEach(['male','female'], (gender) => {
      it(`should have ${gender} data for every height entry in table ${table}`, () => {
        expect(
          _.every(tables[table], _.property(gender))
        ).toBeTrue()
      })
    })
  })
})

// incremental checks; ensure that numbers increase from top left to bottom right

const isArrayIncremental = (x) => {
  return _.every(x, (value, index, array) => {
    return index === 0 || parseFloat(array[index -1]) <= parseFloat(value)
  })
}

const createMatrices = (table, gender) => {
  var matrixRow = []
  var matrixColumn = []
  var keys = _.sortedUniq(_.keys(table))
  var matrixWidth = table[keys[0]][gender].length

  _.forEach(_.range(matrixWidth), () => {
    matrixColumn.push([])
  })
  _.forEach(keys, (x) => { 
    matrixRow.push(table[x][gender])
    _.forEach(_.range(matrixWidth), (y) => {
      matrixColumn[y].push(table[x][gender][y])
    })
  })

  it('should correctly setup temporary data matrices', () => {
    expect(matrixWidth).toBe(expectedNumOfDeviations)
    expect(matrixColumn.length).toBe(matrixWidth)
    _.forEach(_.range(matrixWidth), (x) => {
      expect(matrixColumn[x].length).toBe(matrixRow.length)
    })
  })
  return {
    row: matrixRow,
    column: matrixColumn,
  }
}

describe('table incremental checks', () => {
  _.forEach(_.range(expectedNumOfTables), (table) => {
    _.forEach(['male','female'], (gender) => {
      var matrices = createMatrices(tables[table], gender)
      _.forEach(['row','column'], (matrix) => {
        it(`should increase along each ${matrix} for table ${table}, ${gender}`, () => {
          expect(
            _.every(matrices[matrix], (x) => {
              return isArrayIncremental(x) || console.warn(x)
            })
          ).toBeTrue()
        })
      })
    })
  })
})

// example children

describe('example young children checks; under 2 years', () => {
  _.forEach([
    // args -> gender, age in months, height, weight
    {args: ['male',    1,  43,  1.9], result: undefined},
    {args: ['male',    6,  51,  3.1], result: -1},
    {args: ['female',  6,  48,  2.8], result: 0},
    {args: ['male',   12,  65,  7.5], result: +1},
    {args: ['female', 12,  68,  6.0], result: -3},
    {args: ['male',   18,  75,  8.0], result: -2},
    {args: ['female', 18,  75,  8.0], result: -1},
    {args: ['male',   20,  86, 10.0], result: -2},
    {args: ['female', 20,  84, 10.0], result: -1},
    {args: ['male',   22, 101, 13.3], result: -1},
    {args: ['female', 22,  99, 13.6], result: 0},
    {args: ['female', 23, 111, 16.5], result: undefined},
  ], (x) => {
    it(`should return for a ${x.args[1]} month ${x.args[0]}, ${x.args[2]} cm, ${x.args[3]} kg => ${x.result}`, () => {
      expect(
        WeightHeightCalculator.getZScore(...x.args)
      ).toBe(x.result)
    })
  })
})

describe('example older children checks; 2 years -> 5 years', () => {
  _.forEach([
    // args -> gender, age in months, height, weight
    {args: ['female', 24,  60,  6.0], result: undefined},
    {args: ['male',   25,  70,  7.3], result: -2},
    {args: ['female', 25,  66,  6.5], result: -1},
    {args: ['male',   28,  87, 10.1], result: -2},
    {args: ['female', 28,  87, 10.1], result: -1},
    {args: ['male',   40,  90, 10.6], result: -2},
    {args: ['female', 40,  90, 10.6], result: -2},
    {args: ['male',   48,  100, 15.5], result: 1},
    {args: ['female', 48,  102, 15.0], result: 0},
    {args: ['male',   60,  115, 15.5], result: -3},
    {args: ['female', 60,  111, 14.6], result: -2},
    {args: ['male',   60,  121, 21.5], result: undefined},
    {args: ['female', 61,  111, 14.6], result: undefined},
  ], (x) => {
    it(`should return for a ${x.args[1]} month ${x.args[0]}, ${x.args[2]} cm, ${x.args[3]} kg => ${x.result}`, () => {
      expect(
        WeightHeightCalculator.getZScore(...x.args)
      ).toBe(x.result)
    })
  })
})
