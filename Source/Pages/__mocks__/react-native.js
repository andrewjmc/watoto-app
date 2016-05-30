'use strict'

// Delegate to mock RN library (who's auto-loader seems broken)
const ReactNativeMock = require('react-native-mock/build/react-native')
module.exports = ReactNativeMock
