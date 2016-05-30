'use strict'  

require('jasmine-expect')

const {
  Time,
} = require('../../__tests__/Test-helpers')

jest.dontMock('../Child')
const Child = require('../Child')

const WeightEstimator = require('../../Data/Child/WeightEstimator')
const WeightHeightCalculator = require('../../Data/Child/WeightHeightCalculator')
const SurfaceAreaCalculator = require('../../Data/Child/SurfaceAreaCalculator')

describe('Child', () => {
  var child

  beforeEach(() => {
    child = new Child()
    WeightEstimator.getEstimate.mockClear()
    WeightHeightCalculator.getZScore.mockClear()
    SurfaceAreaCalculator.getSurfaceArea.mockClear()
  })

  it('should update age state when an age is provided', () => {
    const age = 5
    child.set('ageRaw', 5)

    expect(child.age)
      .toBe(age)
  })

  it('should scale age state when an age and scale is provided', () => {
    const age = Time.days(10)
    child.set('ageRaw', age.input)
    child.set('ageScale', age.scale)

    expect(child.age)
      .toBe(parseFloat(age.month))
  })


  it('should esimate weight if set', () => {
    const age = Time.weeks(5)
    const mockWeight = 7

    WeightEstimator.getEstimate.mockImplementation(() => mockWeight)

    child.set('ageRaw', age.input)
    child.set('ageScale', age.scale)
    child.set('estimateWeight', true)

    expect(WeightEstimator.getEstimate)
      .toBeCalled()
    expect(WeightEstimator.getEstimate.mock.calls.length)
      .toBe(1)
    expect(WeightEstimator.getEstimate.mock.calls[0])
      .toEqual([parseFloat(age.month),false])
    expect(child.weight)
      .toBe(mockWeight)
  })

  it('should esimate underweight if set', () => {
    const age = Time.weeks(5)
    child.set('ageRaw', age.input)

    child.set('ageRaw', age.input)
    child.set('ageScale', age.scale)
    child.set('estimateWeight', true)
    child.set('estimateUnderweight', true)

    expect(WeightEstimator.getEstimate)
      .toBeCalled()
    expect(WeightEstimator.getEstimate.mock.calls.length)
      .toBe(2)
    expect(WeightEstimator.getEstimate.mock.calls[1])
      .toEqual([parseFloat(age.month),true])
  })

  it('should calculate a z-score when age, weight and height are provided', () => {
    const age = '5'
    const weight = '5'
    const height = '58'
    const mockZScore = -1

    WeightHeightCalculator.getZScore.mockImplementation(() => mockZScore)

    child.set('ageRaw', age)
    child.set('weightRaw', weight)
    child.set('heightRaw', height)

    expect(WeightHeightCalculator.getZScore)
      .toBeCalled()
    expect(WeightHeightCalculator.getZScore)
      .lastCalledWith('male', parseFloat(age), parseFloat(height), parseFloat(weight))
    expect(child.zScore)
      .toBe(mockZScore)
  })

  it('should calculate an approximate body surface area when weight is provided', () => {
    const weight = '5'
    const mockSurfaceArea = '~0.28'

    SurfaceAreaCalculator.getSurfaceArea.mockImplementation(() => mockSurfaceArea)

    child.set('weightRaw', weight)

    expect(SurfaceAreaCalculator.getSurfaceArea)
      .toBeCalled()
    expect(SurfaceAreaCalculator.getSurfaceArea)
      .lastCalledWith(undefined, parseFloat(weight))
    expect(child.surfaceArea)
      .toBe(mockSurfaceArea)
  })

  it('should calculate a body surface area when height and weight is provided', () => {
    const weight = '5'
    const height = '58'
    const mockSurfaceArea = '0.28'

    SurfaceAreaCalculator.getSurfaceArea.mockImplementation(() => mockSurfaceArea)

    child.set('weightRaw', weight)
    child.set('heightRaw', height)

    expect(SurfaceAreaCalculator.getSurfaceArea)
      .toBeCalled()
    expect(SurfaceAreaCalculator.getSurfaceArea)
      .lastCalledWith(parseFloat(height), parseFloat(weight))
    expect(child.surfaceArea)
      .toBe(mockSurfaceArea)
  })
})
