'use strict'

import React from 'react'
import ReactNative, {
  AsyncStorage,
  Alert,
} from 'react-native'

const Network = require('./Network')

const DevMenu = () => {
  Alert.alert(
    'Developer Menu',
    'Tools to assist with development',
    [
      {text: 'State', style: 'default', onPress: StateMenu},
      {text: 'Network', style: 'default', onPress: NetworkMenu},
      {text: 'Cancel', style: 'cancel'},
    ]
  )
}

const StateMenu = () => {
  Alert.alert(
    'State Menu',
    'Clear persisted state',
    [
      {text: 'Disclaimer', style: 'default', onPress: () => {
        AsyncStorage.removeItem('disclaimer.state')
      }},
      {text: 'Network', style: 'default', onPress: () => {
        AsyncStorage.removeItem('network.state')
      }},
      {text: 'Cancel', style: 'cancel'},
    ]
  )
}

const NetworkMenu = () => {
  Alert.alert(
    'Network Menu',
    'Stats/update networking',
    [
      {text: 'Ping Now', style: 'default', onPress: () => {
        Network.get().ping()
      }},
      {text: 'Cancel', style: 'cancel'},
    ]
  )
}

module.exports = DevMenu
