'use strict'

import TimerMixin from 'react-timer-mixin'
import TabNavigator from 'react-native-tab-navigator'

import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native'

const Ionicons = require('../UI/Ionicons') // react-native-vector-icons/Ionicons
const DeviceInfo = require('react-native-device-info')
const Moment = require('moment')
const SemVer = require('semver')

const GLOBAL = require('../Globals')
const APPINFO = require('../AppInfo')
const URL = require('../UI/URL')
const Developer = require('../Developer')
const Network = require('../Network')

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingTop: 0,
  },
  section: {
    paddingTop: (4 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (2 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: '#ccc',
    borderBottomWidth: GLOBAL.PIXEL,
    flexDirection: 'row',
    flex: 1,
  },
  sectionBorderless: {
    paddingTop: (4 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (2 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    flex: 1,
  },
  sectionLabel: {
    width: 175,
    marginTop: 4,
    marginBottom: 6,
    flex: 2,
    fontSize: 20,
    textAlign: 'left',
    color: '#000',
  },
  sectionText: {
    marginTop: 8,
    marginBottom: 6,
    flex: 3,
    fontSize: 16,
    textAlign: 'right',
    color: '#000',
  },
  disclaimerText: {
    flex: 3,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'left',
    color: '#000',
  },
  updateText: {
    flex: 1,
    fontSize: 18,
    marginTop: 6,
    marginBottom: 6,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#000',
  },
  creditsText: {
    flex: 3,
    fontSize: 13,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'left',
    color: '#000',
  },
  buildInfoText: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
    alignItems: 'center',
    color: '#aaa',
  },
  buildInfoTouchable: {
    flex: 1,
    alignItems: 'center',
  },
  debug: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  debugText: {
    fontSize: 32,
    textAlign: 'center',
    color: '#f3f3f3',
  },
  link: {
    color: '#4F8EF7',
    fontSize: 14,
  },
  linkNext: {
    flex: 1,
    marginTop: 5,
    fontSize: 24,
    color: '#4F8EF7',
    textAlign: 'right',
  },
})

const img = {
  rcpch: 'data:image/png;base64,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',
  kpa: 'data:image/png;base64,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',
  thet: 'data:image/png;base64,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',
  ukaid: 'data:image/png;base64,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',
}

const UpdateSection = React.createClass({
  mixins: [TimerMixin],
  checkUpdateFreq: 1000,
  checkUpdateTimeout: undefined,

  componentDidMount() {
    this.checkUpdate()
  },

  checkUpdate() {
    if (this.checkUpdateTimeout) this.clearTimeout(this.checkUpdateTimeout)
    this.checkUpdateTimeout = undefined

    var lastAttempt = Moment(Network.get().state.lastAttempt)
    var lastPing = Moment(Network.get().state.lastPing)

    // If no response in the last 5 minutes and a request was started in the last minute (possibly pending)
    if (!lastPing.isAfter(Moment().subtract(5, 'minute')) && lastAttempt.isAfter(Moment().subtract(1, 'minute'))) {
      this.checkUpdateTimeout = this.setTimeout(this.checkUpdate, this.checkUpdateFreq)
    }

    this.forceUpdate()
  },

  render() {
    var latestApp = Network.get().state.latestApp
    var lastCheck = Moment(Network.get().state.lastPing)

    if (latestApp == undefined || lastCheck.isBefore(Moment().subtract(7, 'day'))) {
      var icon = (!this.checkUpdateTimeout ? 'chevron-right' : 'load-d')

      return (
        <TouchableHighlight underlayColor='#EEE' onPress={() => {
          if (!this.checkUpdateTimeout) {
            Network.get().pingCheck()
            this.checkUpdate()
            this.forceUpdate()
          }
        }}>
          <View style={styles.section}>
            <Text style={[styles.sectionLabel,{flex:3,width:225}]}>
              Check for update
            </Text>
            <Ionicons style={styles.linkNext} name={icon} />
          </View>
        </TouchableHighlight>
      )
    }

    if (SemVer.lte(latestApp, APPINFO.buildVersion)) {
      return (
        <View style={[styles.section,{flexDirection:'column',justifyContent:'center'}]}>
          <Text style={[styles.updateText,{marginBottom:0}]}>
            You are running the latest version
          </Text>
          <Text style={[styles.updateText,{marginTop:0,fontSize:14}]}>
            (as of {lastCheck.fromNow()})
          </Text>
        </View>
      )
    }

    return (
      <TouchableHighlight underlayColor='#EEE' onPress={() => Network.get().update()}>
        <View style={styles.section}>
          <Text style={[styles.sectionLabel,{flex:3,width:225}]}>
            New version available!
          </Text>
          <Ionicons style={styles.linkNext} name='chevron-right' />
        </View>
      </TouchableHighlight>
    )
  },
})

const Settings = React.createClass({
  getInitialState() {
    return {
      devPresses: 0,
      selectedTab: this.props.tab || 'about',
    }
  },

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'about'}
          title="About"
          renderIcon={() => <Ionicons name='code-working' size={24} color='#CCC' />}
          renderSelectedIcon={() => <Ionicons name='code-working' size={24} color='#4F8EF7' />}
          onPress={() => this.setState({ selectedTab: 'about' })}>
          {this._renderAbout()}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'legal'}
          title="Legal"
          renderIcon={() => <Ionicons name='document-text' size={24} color='#CCC' />}
          renderSelectedIcon={() => <Ionicons name='document-text' size={24} color='#4F8EF7' />}
          onPress={() => this.setState({ selectedTab: 'legal' })}>
          {this._renderLegal()}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'credits'}
          title="Credits"
          renderIcon={() => <Ionicons name='chatboxes' size={24} color='#CCC' />}
          renderSelectedIcon={() => <Ionicons name='chatboxes' size={24} color='#4F8EF7' />}
          onPress={() => this.setState({ selectedTab: 'credits' })}>
          {this._renderCredits()}
        </TabNavigator.Item>
      </TabNavigator>
    )
  },

  _renderAbout() {
    var buildMoment = Moment(APPINFO.buildTime, 'YYYY-MM-DD HH:mm:ss ZZ')
    var buildTime = buildMoment.format('YYYY-MM-DD')

    return (
      <ScrollView ref='container' style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Version
          </Text>
          <Text style={styles.sectionText}>
            {DeviceInfo.getVersion()}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Build Date
          </Text>
          <Text style={styles.sectionText}>
            {buildTime}
          </Text>
        </View>
        <UpdateSection />
        <TouchableHighlight underlayColor='#EEE' onPress={() => {
          const url = `mailto:watoto@cyberfish.org?subject=Watoto%20Feedback%20%28${APPINFO.buildVersion}%2F${APPINFO.sourceVersion}%29`
          Linking.openURL(url)
        }}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              Send us feedback
            </Text>
            <Ionicons style={styles.linkNext} name='chevron-right' />
          </View>
        </TouchableHighlight>
        <View style={[styles.sectionBorderless,{alignItems:'center',marginTop:5}]}>
          <TouchableOpacity activeOpacity={1} style={styles.buildInfoTouchable} onPress={() => {
            this.state.devPresses++
            this.forceUpdate()
          }}>
            <Text style={styles.buildInfoText}>
              {APPINFO.buildVersion} ({APPINFO.sourceVersion})
              {'\n'}
              {APPINFO.sourceTime}
            </Text>
          </TouchableOpacity>
        </View>
        {
          this.state.devPresses >= 5 ?
          <View style={styles.debug}>
            <TouchableOpacity onPress={Developer}>
              <Text style={styles.debugText}>{'\u03C0'}</Text>
            </TouchableOpacity>
          </View>
          : null
        }
      </ScrollView>
    )
  },

  _renderLegal() {
    return (
      <ScrollView ref='container' style={styles.container}>
        <View style={[styles.sectionBorderless,{paddingBottom:0}]}>
          <Text style={styles.sectionLabel}>
            Disclaimer
          </Text>
        </View>
        <View style={[styles.section,{paddingTop:0}]}>
          <Text style={styles.disclaimerText}>
            {GLOBAL.DISCLAIMER_TEXT}
          </Text>
        </View>
      </ScrollView>
    )
  },

  _renderCredits() {
    return (
      <ScrollView ref='container' style={styles.container}>
        <View style={[styles.sectionBorderless,{paddingBottom:0}]}>
          <Text style={styles.creditsText}>
            Proudly developed in Kenya
            {'\n'}
            by UK volunteers and local doctors
            {'\n'}
            as part of the RCPCH Global Links programme
{/*}
            {'\n'}
            in partnership with the KPA
{*/}
          </Text>
        </View>
        <View style={[styles.sectionBorderless,{paddingTop:10,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}]}>
          <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
            <URL proto={'http://'} url={'rcpch.ac.uk'} image={{style:{width:83,height:32,alignSelf:'center'},uri:img.rcpch}} style={{color:'#4F8EF7',fontSize:14,alignSelf:'center'}} />
          </View>
{/*}
          <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
            <URL proto={'http://'} url={'kenyapaediatric.org'} image={{style:{width:108,height:32,alignSelf:'center'},uri:img.kpa}} style={{color:'#4F8EF7',fontSize:14,alignSelf:'center'}} />
          </View>
{*/}
        </View>
        <View style={[styles.sectionBorderless,{paddingTop:0,paddingBottom:0}]}>
          <Text style={styles.creditsText}>
            With grateful support from
          </Text>
        </View>
        <View style={[styles.section,{paddingTop:0,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}]}>
          <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
            <URL proto={'http://'} url={'thet.org'} image={{style:{width:69,height:32,alignSelf:'center'},uri:img.thet}} style={{color:'#4F8EF7',fontSize:14,alignSelf:'center'}} />
          </View>
          <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
            <URL proto={'http://'} url={'dfid.gov.uk'} image={{style:{width:43.5,height:48,alignSelf:'center'},uri:img.ukaid}} style={{color:'#4F8EF7',fontSize:14,alignSelf:'center'}} />
          </View>
        </View>
        <View style={[styles.section,{flexDirection:'column'}]}>
          <Text style={styles.creditsText}>
            Information sourced from...{'\n'}
            Kenya Basic Paediatric Protocols{'\n'}
            4th Edition (Febuary 2016)
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.creditsText}>
            Medical Cross, Hospital, Bacteria, Crying & Ray
            {'\n'}
            Icons made by Freepix from www.flaticon.com
          </Text>
        </View>
      </ScrollView>
    )
  },
})

module.exports = Settings
