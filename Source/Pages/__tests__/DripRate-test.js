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

jest.dontMock('../DripRate')
const DripRate = require('../DripRate')

function find(app, type, refName) {
  return app.find(type).findWhere(n => n.node.ref == refName)
}

describe('State renders correctly into user interface', () => {
  var app, state

  beforeEach(() => {
    state = {
      name: 'Fluid infusion rate',
      time: 1,
      volume: 60
    }

    app = shallow(
      <DripRate name={state.name} volume={state.volume} time={state.time}/>
    )
  })

  it('should correctly render volume and time', () => {
    expect(
      find(app, 'Text', 'vol-time-text')
        .childAt(0).node
    ).toBe("60 ml over 1 hour")
  })

  it('should correctly render calculations', () => {
	
	/*expect(
      find(app, 'Text', 'rate-text')
        .childAt(0).node
    ).toBe("60 ml/h")
    expect(
      find(app, 'Text', 'drip-rate-text')
        .childAt(0).node
    ).toBe("20 drops/min")
    expect(
      find(app, 'Text', 'drip-second-text')
        .childAt(0).node
    ).toBe("1s between drips")*/
  })
})
