'use strict'

import React from 'react'
import {
  View,
  ScrollView,
} from 'react-native'

import {
  shallow,
} from 'enzyme'

const _ = require('lodash')
require('jasmine-expect')
const jasmineMatchers = require('jasmine-matchers-loader')

const GLOBAL = require('../../Globals')

const {
  Child,
} = require('../../__tests__/Test-helpers')

jest.dontMock('../DrugDoseInfo')
const DrugDoseInfo = require('../DrugDoseInfo')

function find(app, type, refName) {
  return app.find(type).findWhere(n => n.node.ref == refName)
}

const DrugRegistry = require('../../Data/DrugRegistry')

describe('State renders correctly into user interface', () => {
  var app, state, drug, calculation

  beforeEach(() => {
    state = {
      child: Child.create({
        ageRaw: '28',
        ageScale: GLOBAL.AGE_SCALES[0],
        gender: GLOBAL.GENDERS[1],
        weight: '5',
      }),
    }

    calculation = [
      {heading: 'heading 1', dose: 'dose 1', route: 'route 1'},
      {dose: 'dose 2', additional: 'additional 2', route: 'route 2'},
    ]
    drug = {
      name: 'Test',
      description: 'Description',
      warning: 'Warning',
      additional: 'Additional',
      calculate: jest.fn(() => calculation),
    }

    DrugRegistry.get.mockClear() 
    DrugRegistry.getForType.mockClear()

    DrugRegistry.get.mockImplementation(() => drug)
    DrugRegistry.getForType.mockImplementation(() => [drug])

    app = shallow(
      <DrugDoseInfo state={state} name={drug.name} />
    )
  })

  it('should correctly render calculations', () => {
    expect(drug.calculate)
      .toBeCalled()
    expect(drug.calculate)
      .lastCalledWith(state.child)

    expect(
      find(app, 'Text', 'calculation-0-heading')
        .childAt(0).node
    ).toBe(calculation[0].heading)
    expect(
      find(app, 'Text', 'calculation-0-dose')
        .childAt(0).node
    ).toBe(calculation[0].dose)
    expect(
      find(app, 'Text', 'calculation-0-route')
        .childAt(0).node
    ).toBe(calculation[0].route)

    expect(
      find(app, 'Text', 'calculation-1-dose')
        .childAt(0).node
    ).toBe(calculation[1].dose)
    expect(
      find(app, 'Text', 'calculation-1-additional')
        .childAt(0).node
    ).toBe(calculation[1].additional)
    expect(
      find(app, 'Text', 'calculation-1-route')
        .childAt(0).node
    ).toBe(calculation[1].route)
  })

  it('should correctly render description', () => {
    expect(
      find(app, 'Text', 'description')
        .childAt(0).node
    ).toBe(drug.description)
  })

  it('should correctly render warning', () => {
    expect(
      find(app, 'Text', 'warning')
        .childAt(0).node
    ).toBe(drug.warning)
  })

  it('should correctly render additional', () => {
    expect(
      find(app, 'Text', 'additional')
        .childAt(0).node
    ).toBe(drug.additional)
  })
})
