'use strict'

import React from 'react'
import {
  Platform,
  View,
  DeviceEventEmitter,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Text,
  PixelRatio,
} from 'react-native'

var InputAccessory

if (Platform.OS == 'ios') {
  const StatusBarSizeIOS = require('react-native-status-bar-size')
  const dismissKeyboard = require('dismissKeyboard')

  const DEBUG = false
  const INPUT_ACCESSORY_HEIGHT = 48
  const INPUT_ACCESSORY_POSITION = 65
  const INPUT_ACCESSORY_STATUSBAR_SIZE = 20
  const INPUT_ACCESSORY_ANIMATION_DURATION_IN = 400
  const INPUT_ACCESSORY_ANIMATION_DURATION_OUT = 0

  const s = StyleSheet.create({
    InputAccessory: {
      alignItems: 'flex-end',
      backgroundColor: '#ecedef',
      height: INPUT_ACCESSORY_HEIGHT,
      position: 'absolute',
      left: 0,
      right: 0,
      flex: 1,
      elevation: -1,
      borderColor: '#d3d3d3',
      borderTopWidth: 2 / PixelRatio.get(),
    },
    InputAccessoryButtonText: {
      fontSize: 17,
      letterSpacing: 0.5,
      color: '#007aff',
      backgroundColor: 'transparent',
      paddingHorizontal: 13,
      paddingVertical: 13,
    },
  })

  var _keyboardWillShow, _keyboardWillHide

  InputAccessory = React.createClass({
    getInitialState() {
      return {
        visibleHeight: Dimensions.get('window').height,
        statusBarHeight: StatusBarSizeIOS.currentHeight,
        opacity: 0,
      }
    },

    componentWillMount() {
      // console.log('componentWillMount')
      _keyboardWillShow = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow)
      _keyboardWillHide = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide)
      StatusBarSizeIOS.addEventListener('willChange', this.handleStatusBarSizeWillChange)
      StatusBarSizeIOS.addEventListener('didChange', this.handleStatusBarSizeDidChange)
    },

    componentWillUnmount() {
      if (_keyboardWillShow) _keyboardWillShow.remove()
      if (_keyboardWillHide) _keyboardWillHide.remove()
      StatusBarSizeIOS.removeEventListener('willChange', this.handleStatusBarSizeWillChange)
      StatusBarSizeIOS.removeEventListener('didChange', this.handleStatusBarSizeDidChange)

      // console.log('componentWillUnmount')
      let newSize = Dimensions.get('window').height
      this.setState({
        visibleHeight: newSize,
        statusBarHeight: StatusBarSizeIOS.currentHeight,
        opacity: 0
      })
    },

    keyboardWillShow(e) {
      // console.log('keyboardWillShow')
      var newSize = e.endCoordinates.screenY - (INPUT_ACCESSORY_HEIGHT-1) //-1 so 1px is showing so it doesn't unmount
      LayoutAnimation.configureNext({
        duration: INPUT_ACCESSORY_ANIMATION_DURATION_IN,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.scaleXY
        },
        update: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.scaleXY
        },
      })
      this.setState({
        visibleHeight: newSize,
        statusBarHeight: StatusBarSizeIOS.currentHeight,
        opacity: 1,
      })
      // console.log(this.state)
    },

    rotateDevice () {
      return false
    },

    keyboardWillHide(e) {
      // console.log('keyboardWillHide')
      let newSize = Dimensions.get('window').height
      this.setState({
        visibleHeight: newSize,
        statusBarHeight: StatusBarSizeIOS.currentHeight,
        opacity: 0,
      })
      // console.log(this.state)
    },

    dismissKeyboardHandler() {
      LayoutAnimation.configureNext({
        duration: INPUT_ACCESSORY_ANIMATION_DURATION_OUT,
        create: {
          type: LayoutAnimation.Types.linear,
        },
        update: {
          type: LayoutAnimation.Types.linear,
        },
      })

      let newSize = Dimensions.get('window').height
      this.setState({
        visibleHeight: newSize,
        opacity: 0,
      })

      // console.log('dismissKeyboard')
      dismissKeyboard()
    },

    handleStatusBarSizeWillChange(newStatusBarHeight) {
      if (newStatusBarHeight < this.state.statusBarHeight) {
        this.state.statusBarHeight = newStatusBarHeight
        this.forceUpdate()
      }
    },

    handleStatusBarSizeDidChange(newStatusBarHeight) {
      if (newStatusBarHeight >= this.state.statusBarHeight) {
        this.state.statusBarHeight = newStatusBarHeight
        this.forceUpdate()
      }
    },

    render() {
      return (
        <View 
          style={[s.InputAccessory,{
            opacity: this.state.opacity,
            top: this.state.visibleHeight - INPUT_ACCESSORY_POSITION - this.state.statusBarHeight + INPUT_ACCESSORY_STATUSBAR_SIZE
          }]} 
          onLayout={(e) => this.rotateDevice(e)}>
            <TouchableOpacity
              onPress={() => this.dismissKeyboardHandler()}>
              <Text style={[s.InputAccessoryButtonText]}>
                Done
              </Text>
            </TouchableOpacity>
        </View>
      )
    }
  })
}

module.exports = InputAccessory
