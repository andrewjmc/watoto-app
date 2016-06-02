'use strict'

import React from 'react'
import {
  View,
  ScrollView,
} from 'react-native'

// const TestUtils = require('react-addons-test-utils')

import {
  shallow,
} from 'enzyme'

const _ = require('lodash')
require('jasmine-expect')
const jasmineMatchers = require('jasmine-matchers-loader')

jest.dontMock('../ChildInfo')
const ChildInfo = require('../ChildInfo')

jest.dontMock('../../Data/Child')
const Child = require('../../Data/Child')

jest.dontMock('../../Globals')
const GLOBAL = require('../../Globals')

function find(app, type, refName) {
  return app.find(type).findWhere(n => n.node.ref == refName)
}

const WeightEstimator = require('../../Data/Child/WeightEstimator')
const WeightHeightCalculator = require('../../Data/Child/WeightHeightCalculator')
const SurfaceAreaCalculator = require('../../Data/Child/SurfaceAreaCalculator')
const MidUpperArmCalculator = require('../../Data/Child/MidUpperArmCalculator')

const initialState = (overrides) => {
  var child = new Child()
  if (overrides) {
    _.forEach(overrides, (value, key) => {
      child[key] = value
    })
  }
  return ({
    child: child,
  })
}

describe('User inputs correctly update state', () => {
  var app, state

  beforeEach(() => {
    state = initialState({
      ageScale: GLOBAL.AGE_SCALES[2],
      gender: GLOBAL.GENDERS[0],
    })

    WeightEstimator.getEstimate.mockClear()
    WeightHeightCalculator.getZScore.mockClear()
    SurfaceAreaCalculator.getSurfaceArea.mockClear()

    app = shallow(
      <ChildInfo state={state} />
    )
  })

  it('should update the app state when an age is provided', () => {
    const age = '28'

    find(app, 'TextInput', 'ageRaw')
      .simulate('changeText', age)

    expect(state.child.ageRaw)
      .toBe(age)
    expect(state.child.age)
      .toBe(parseFloat(age))
  })

  it('should estimate a weight when toggled and an age provided', () => {
    const age = '28'
    const mockWeight = '99.9'

    WeightEstimator.getEstimate.mockImplementation(() => mockWeight)

    find(app, 'TextInput', 'ageRaw')
      .simulate('changeText', age)
    find(app, 'Switch', 'estimateWeight')
      .simulate('valueChange', true)

    expect(state.child.estimateWeight)
      .toBeTrue()
    expect(WeightEstimator.getEstimate.mock.calls.length)
      .toBe(1)
    expect(WeightEstimator.getEstimate.mock.calls[0])
      .toEqual([parseFloat(age), false])
    expect(state.child.weight)
      .toBe(parseFloat(mockWeight))
  })

  it('should estimate underweight when toggled and an age provided', () => {
    const age = '28'
    const mockWeight = '99.9'
    const mockUnderweight = '88.8'

    find(app, 'TextInput', 'ageRaw')
      .simulate('changeText', age)

    WeightEstimator.getEstimate.mockImplementation(() => mockWeight)
    find(app, 'Switch', 'estimateWeight')
      .simulate('valueChange', true)

    WeightEstimator.getEstimate.mockImplementation(() => mockUnderweight)
    find(app, 'Switch', 'estimateUnderweight')
      .simulate('valueChange', true)

    expect(state.child.estimateUnderweight)
      .toBeTrue()
    expect(WeightEstimator.getEstimate.mock.calls.length)
      .toBe(2)
    expect(WeightEstimator.getEstimate.mock.calls[0])
      .toEqual([parseFloat(age), false])
    expect(WeightEstimator.getEstimate.mock.calls[1])
      .toEqual([parseFloat(age), true])
    expect(state.child.weight)
      .toBe(parseFloat(mockUnderweight))
  })

  it('should calculate a z-score when age, weight and height are provided', () => {
    const age = '5'
    const weight = '5'
    const height = '58'
    const mockZScore = -1

    WeightHeightCalculator.getZScore.mockImplementation(() => mockZScore)

    find(app, 'TextInput', 'ageRaw')
      .simulate('changeText', age)
    find(app, 'TextInput', 'weightRaw')
      .simulate('changeText', weight)
    find(app, 'TextInput', 'heightRaw')
      .simulate('changeText', height)

    expect(WeightHeightCalculator.getZScore)
      .toBeCalled()
    expect(WeightHeightCalculator.getZScore)
      .lastCalledWith('male', parseFloat(age), parseFloat(height), parseFloat(weight))
    expect(state.child.zScore)
      .toBe(mockZScore)
  })

  it('should calculate a MUAC score when muac is provided', () => {
    const muac = '12.5'
    const mockMuacScore = -1

    MidUpperArmCalculator.getScore.mockImplementation(() => mockMuacScore)

    find(app, 'TextInput', 'muacRaw')
      .simulate('changeText', muac)

    expect(MidUpperArmCalculator.getScore)
      .toBeCalled()
    expect(MidUpperArmCalculator.getScore)
      .lastCalledWith(parseFloat(muac))
    expect(state.child.muacScore)
      .toBe(mockMuacScore)
  })

  it('should calculate an approximate body surface area when weight is provided', () => {
    const weight = '5'
    const mockSurfaceArea = '~0.28'

    SurfaceAreaCalculator.getSurfaceArea.mockImplementation(() => mockSurfaceArea)

    find(app, 'TextInput', 'weightRaw')
      .simulate('changeText', weight)

    expect(SurfaceAreaCalculator.getSurfaceArea)
      .toBeCalled()
    expect(SurfaceAreaCalculator.getSurfaceArea)
      .lastCalledWith(undefined, parseFloat(weight))
    expect(state.child.surfaceArea)
      .toBe(mockSurfaceArea)
  })

  it('should calculate a body surface area when height and weight is provided', () => {
    const weight = '5'
    const height = '58'
    const mockSurfaceArea = '0.28'

    SurfaceAreaCalculator.getSurfaceArea.mockImplementation(() => mockSurfaceArea)

    find(app, 'TextInput', 'weightRaw')
      .simulate('changeText', weight)
    find(app, 'TextInput', 'heightRaw')
      .simulate('changeText', height)

    expect(SurfaceAreaCalculator.getSurfaceArea)
      .toBeCalled()
    expect(SurfaceAreaCalculator.getSurfaceArea)
      .lastCalledWith(parseFloat(height), parseFloat(weight))
    expect(state.child.surfaceArea)
      .toBe(mockSurfaceArea)
  })
})

describe('State renders correctly into user interface', () => {
  var app, state

  beforeEach(() => {
    state = initialState({
      ageRaw: '28',
      ageScale: GLOBAL.AGE_SCALES[0],
      gender: GLOBAL.GENDERS[1],
      weight: '5',
      height: '58',
      muac: '12.5',
      muacScore: -1,
      zScore: -1,
      surfaceArea: '0.28',
    })

    app = shallow(
      <ChildInfo state={state} />
    )
  })

  it('should correctly render age input', () => {
    expect(
      find(app, 'TextInput', 'ageRaw')
        .node.props.value
    ).toBe(state.child.ageRaw)
  })

  it('should correctly render age scale select', () => {
    expect(
      find(app, 'SegmentedControls', 'ageScale')
        .node.props.selectedOption
    ).toBe(state.child.ageScale)
  })

  it('should correctly render gender select', () => {
    expect(
      find(app, 'SegmentedControls', 'gender')
        .node.props.selectedOption
    ).toBe(state.child.gender)
  })

  it('should correctly render weight input', () => {
    expect(
      find(app, 'TextInput', 'weightRaw')
        .node.props.value
    ).toBe(state.child.weightRaw)
  })

  it('should correctly render height input', () => {
    expect(
      find(app, 'TextInput', 'heightRaw')
        .node.props.value
    ).toBe(state.child.heightRaw)
  })

  it('should correctly render muac input', () => {
    expect(
      find(app, 'TextInput', 'muacRaw')
        .node.props.value
    ).toBe(state.child.muacRaw)
  })

  it('should correctly render z-score', () => {
    expect(
      find(app, 'Text', 'zScore')
        .childAt(0).node
    ).toContain(state.child.zScore)
  })

  it('should correctly render surface area', () => {
    expect(
      find(app, 'Text', 'surfaceArea')
        .childAt(0).node
    ).toBe(state.child.surfaceArea)
  })
})
