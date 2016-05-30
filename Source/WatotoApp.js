'use strict'

import ExNavigator from '@exponent/react-native-navigator'

import React from 'react'
import ReactNative, {
  Platform,
  View,
} from 'react-native'

const GLOBAL = require('./Globals')
const Router = require('./Router')
const Child = require('./Data/Child')
const Disclaimer = require('./Pages/Disclaimer')

const WatotoApp = React.createClass({
  componentWillMount() {
    // Development helper to pre-load the ChildInfo page
    // this.state.child.set('ageRaw', '3')
    // this.state.child.set('ageScale', GLOBAL.AGE_SCALES[3])
    // this.state.child.set('weightRaw', '15.51')
  },

  getInitialState() {
    return {
      child: new Child(),
    }
  },

  render() {
    var navigationBarHeight = 64
    if (Platform.OS === 'android') {
      navigationBarHeight = 56
    }
    return (
      <View style={{flex:1}}>
        <ExNavigator
          initialRoute={Router.ChildInfo(this.state)}
          style={{flex:1}}
          sceneStyle={{paddingTop:navigationBarHeight}} />
        <Disclaimer />
      </View>
    )
  },
})

module.exports = WatotoApp
