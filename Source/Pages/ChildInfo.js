'use strict'

import InputAccessory from '../UI/InputAccessory'
import TimerMixin from 'react-timer-mixin'
import { SegmentedControls } from 'react-native-radio-buttons'

import React from 'react'
import ReactNative, {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Switch,
  DeviceEventEmitter,
}  from 'react-native'

const GLOBAL = require('../Globals')
const DeepLink = require('../DeepLink')

const Child = require('../Data/Child')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
  },
  section: {
    paddingTop: (0 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (0 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: '#ccc',
    borderBottomWidth: GLOBAL.PIXEL,
    flexDirection: 'row',
    flex: 1,
  },
  sectionBorderless: {
    paddingTop: (1 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (1 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    flex: 1,
  },
  sectionDynamic: {
    paddingBottom: (3 + GLOBAL.SCREEN_PADDING),
  },
  label: {
    width: 175,
    marginTop: (3 + GLOBAL.SCREEN_PADDING) + (Platform.OS==='ios'?4:2),
    marginLeft: 6,
    marginBottom: (3 + GLOBAL.SCREEN_PADDING),
    flex: 3,
    fontSize: 20,
    textAlign: 'left',
    color: '#000',
  },
  labelDisabled: {
    color: '#aaa',
  },
  input: {
    height: 38,
    width: 100,
    marginTop: (0 + GLOBAL.SCREEN_PADDING),
    marginRight: 5,
    flex: 3,
    fontSize: 20,
    textAlign: 'right',
    backgroundColor: 'transparent',
    color: '#000',
  },
  inputAndroid: {
    paddingTop: -1,
    paddingBottom: -1,
    marginRight: ((Platform.OS==='android' && Platform.Version < 21) ? -2 : 4),
  },
  switch: {
    marginTop: 5,
    marginBottom: 5,
    right: 0,
  },
  text: {
    marginTop: (3 + GLOBAL.SCREEN_PADDING) + (Platform.OS==='ios'?4:2),
    marginRight: 6 + (Platform.OS==='android'?4:0),
    marginBottom: (3 + GLOBAL.SCREEN_PADDING),
    flex: 3,
    fontSize: 20,
    textAlign: 'right',
    color: '#000',
  },
  ageSelect: {
    paddingTop: (1 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (5 + GLOBAL.SCREEN_PADDING),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  genderSelect: {
    paddingTop: (5 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (5 + GLOBAL.SCREEN_PADDING),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  zscoreNone: {
    backgroundColor: '#5CB85C',
  },
  zscoreAtRisk: {
    backgroundColor: '#A1C935',
  },
  zscoreModerate: {
    backgroundColor: '#FFFF32',
  },
  zscoreSevere: {
    backgroundColor: '#D9534F',
  },
})

var _keyboardDidHide

const ChildInfo = React.createClass({
  mixins: [TimerMixin],

  componentWillMount() {
    // Android doesn't appear to blur the input on keyboard hide;
    // so we'll just have todo that ourselves!
    if (Platform.OS == 'android') _keyboardDidHide = DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide)
  },

  componentWillUnmount() {
    if (_keyboardDidHide) _keyboardDidHide.remove()
  },

  componentDidMount() {
    // Handle deep links, have todo here (rather than in WatotoApp)
    // in order to get access to navigator
    DeepLink.initial(this.props.navigator, this.props.state, this.changeState)
  },

  keyboardDidHide(e) {
    this.refs.ageRaw.blur()
    this.refs.weightRaw.blur()
    this.refs.heightRaw.blur()
  },

  inputFocused(refName) {
    const scrollResponder = this.refs.container.getScrollResponder()
    const additionalOffset = (Platform.OS=='ios' ? 125 : 95)
    this.setTimeout(() => {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[refName]),
        additionalOffset,
        true
      )
    }, 220)
  },

  changeState(name, value) {
    this.props.state.child.set(name, value)
    this.forceUpdate()
  },

  renderAge() {
    return (
      <View>
        <View style={[styles.sectionBorderless,{paddingBottom:0}]}>
          <Text 
            style={styles.label}>
            Age
          </Text>
          <TextInput
            ref='ageRaw'
            style={[styles.input,(Platform.OS==='android')?styles.inputAndroid:{}]}
            keyboardType='numeric'
            placeholder='0'
            value={this.props.state.child.ageRaw}
            onFocus={this.inputFocused.bind(this, 'ageRaw')}
            onBlur={this.inputFocused.bind(this, 'ageRaw')}
            onChangeText={this.changeState.bind(this, 'ageRaw')} />
        </View>
        <View style={[styles.section,styles.ageSelect]}>
          <SegmentedControls 
            ref='ageScale'
            tint='#666'
            backgroundColor='#fff'
            selectedTint='#000'
            selectedBackgroundColor='#ccc'
            containerBorderTint='#aaa'
            separatorTint='#aaa'
            options={GLOBAL.AGE_SCALES}
            containerStyle={{
              alignSelf: 'stretch',
            }}
            extractText={(option) => option.label}
            selectedOption={this.props.state.child.ageScale}
            onSelection={this.changeState.bind(this, 'ageScale')} />
        </View>
      </View>
    )
  },

  renderGender() {
    return (
      <View style={[styles.section,styles.genderSelect]}>
        <SegmentedControls 
          ref='gender'
          tint='#666'
          backgroundColor='#fff'
          selectedTint='#000'
          selectedBackgroundColor='#ccc'
          containerBorderTint='#aaa'
          separatorTint='#aaa'
          options={GLOBAL.GENDERS}
          containerStyle={{
            alignSelf: 'stretch',
          }}
          extractText={(option) => option.label}
          selectedOption={this.props.state.child.gender}
          onSelection={this.changeState.bind(this, 'gender')} />
      </View>
    )
  },

  renderEstimateWeight() {
    return (
      <View>
        <View style={[styles.sectionBorderless,{paddingBottom:-2}]}>
          <Text style={styles.label}>
            Estimate Weight?
          </Text>
          <Switch
            ref='estimateWeight'
            style={styles.switch}
            value={this.props.state.child.estimateWeight}
            onValueChange={this.changeState.bind(this, 'estimateWeight')} />
        </View>
        <View style={[styles.section,{paddingTop:-2}]}>
          <Text style={[
            styles.label,
            (!this.props.state.child.estimateWeight)?styles.labelDisabled:{},
          ]}>
            Underweight?
          </Text>
          <Switch
            ref='estimateUnderweight'
            style={styles.switch}
            disabled={!this.props.state.child.estimateWeight}
            value={this.props.state.child.estimateUnderweight}
            onValueChange={this.changeState.bind(this, 'estimateUnderweight')} />
        </View>
      </View>
    )
  },

  renderWeight() {
    return (
      <View style={styles.section}>
        <Text style={styles.label}>
          Weight (kg)
        </Text>
        <TextInput
          ref='weightRaw'
          style={[styles.input,(Platform.OS==='android')?styles.inputAndroid:{}]}
          keyboardType='numeric'
          placeholder='0'
          editable={!this.props.state.child.estimateWeight}
          value={this.props.state.child.weightRaw}
          onFocus={this.inputFocused.bind(this, 'weightRaw')}
          onBlur={this.inputFocused.bind(this, 'ageRaw')}
          onChangeText={this.changeState.bind(this, 'weightRaw')} />
      </View>
    )
  },

  renderHeight() {
    return (
      <View style={styles.section}>
        <Text style={styles.label}>
          Height (cm)
        </Text>
        <TextInput
          ref='heightRaw'
          style={[styles.input,(Platform.OS==='android')?styles.inputAndroid:{}]}
          keyboardType='numeric'
          placeholder='0'
          value={this.props.state.child.heightRaw}
          onFocus={this.inputFocused.bind(this, 'heightRaw')}
          onBlur={this.inputFocused.bind(this, 'ageRaw')}
          onChangeText={this.changeState.bind(this, 'heightRaw')} />
      </View>
    )
  },

  renderMUAC() {
    var style = ''
    switch (this.props.state.child.muacScore) {
      case  0:
        style = styles.zscoreNone
        break
      case -1:
        style = styles.zscoreAtRisk
        break
      case -2:
        style = styles.zscoreModerate
        break
      case -3:
        style = styles.zscoreSevere
        break
    }
    return (
      <View style={[styles.section,style]}>
        <Text style={styles.label}>
          MUAC (cm)
        </Text>
        <TextInput
          ref='muacRaw'
          style={[styles.input,(Platform.OS==='android')?styles.inputAndroid:{}]}
          keyboardType='numeric'
          placeholder='0'
          value={this.props.state.child.muacRaw}
          onFocus={this.inputFocused.bind(this, 'muacRaw')}
          onBlur={this.inputFocused.bind(this, 'ageRaw')}
          onChangeText={this.changeState.bind(this, 'muacRaw')} />
      </View>
    )
  },

  renderZScore() {
    var style = ''
    var text = ''
    switch (this.props.state.child.zScore) {
      case  1:
        style = styles.zscoreNone
        text = 'None; > 0'
        break
      case  0:
        style = styles.zscoreNone
        text = 'None; ≤ 0'
        break
      case -1:
        style = styles.zscoreAtRisk
        text = 'At Risk; ≤ -1'
        break
      case -2:
        style = styles.zscoreModerate
        text = 'Moderate; ≤ -2'
        break
      case -3:
        style = styles.zscoreSevere
        text = 'Severe; ≤ -3'
        break
    }
    return (
      <View style={[styles.section,styles.sectionDynamic,style]}>
        <Text style={styles.label}>
          Z Score
        </Text>
        <Text ref='zScore' style={styles.text}>
          {text}
        </Text>
      </View>
    )
  },

  renderSurfaceArea() {
    return (
      <View style={[styles.section,styles.sectionDynamic]}>
        <Text style={styles.label}>
          Surface Area (m²)
        </Text>
        <Text ref='surfaceArea' style={[styles.text,{flex:1}]}>
          {this.props.state.child.surfaceArea}
        </Text>
      </View>
    )
  },

  renderContainer() {
    return (
      <ScrollView ref='container'
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={false}
        style={styles.container} >

        {this.renderAge()}
        {this.renderGender()}

        {this.renderWeight()}
        {this.renderHeight()}

        {this.renderMUAC()}

        {this.renderZScore()}
        {this.renderSurfaceArea()}

        {this.renderEstimateWeight()}
      </ScrollView>
    )
  },

  render() {
    // Nasty hack to work around platform specific keyboard issues
    switch (Platform.OS) {
      case 'ios':
        return (
          <View style={{flex:1}}>
            {this.renderContainer()}
            <InputAccessory />
          </View>
        )
      case 'android':
      default:
        return this.renderContainer()
    }
  },
})

module.exports = ChildInfo
