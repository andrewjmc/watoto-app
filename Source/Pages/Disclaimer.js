'use strict'

import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Linking,
} from 'react-native'

const _ = require('lodash')
const Moment = require('moment')

const GLOBAL = require('../Globals')
const Network = require('../Network')
const URL = require('../UI/URL')

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    marginBottom: (2 + GLOBAL.SCREEN_PADDING),
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  section: {
    flexDirection: 'column',
    marginTop: (2 + GLOBAL.SCREEN_PADDING),
    marginBottom: (2 + GLOBAL.SCREEN_PADDING),
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  accept: {
    fontSize: 18,
    marginTop: (8 + GLOBAL.SCREEN_PADDING),
    marginBottom: (2 + GLOBAL.SCREEN_PADDING),
    textAlign: 'center',
    color: '#4F8EF7',
  }
})

const img = 'data:image/png;base64,\
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'

const Disclaimer = React.createClass({
  asKey: 'disclaimer.state',

  getInitialState() {
    return {
      version: 1,
      seen: undefined,
    }
  },

  componentDidMount() {
    this.getDisclaimerState()
  },

  getDisclaimerState() {
    AsyncStorage.getItem(this.asKey, (error, value) => {
      if (!error) {
        if (!value) {
          this.state.seen = false
        }
        else {
          try {
            _.merge(this.state, JSON.parse(value))
          }
          catch (ex) {
            console.warn('Corrupt persisted disclaimer state; deleting')
            AsyncStorage.removeItem(this.asKey)
            // on corrupt, assume unseen
            this.state.seen = false
          }
        }
      }
      else {
        // on error, assume unseen
        this.state.seen = false
      }
      this.forceUpdate()
      this.startNetwork()
    })
  },

  setSeenDisclaimerState() {
    var saveState = _.clone(this.state)
    saveState.seen = true
    saveState.time = Moment().valueOf()

    AsyncStorage.setItem(this.asKey, JSON.stringify(saveState), (error) => {
      this.state = saveState
      this.forceUpdate()
      this.startNetwork()
    })
  },

  startNetwork() {
    if (this.state.seen === true) {
      Network.get().start()
    }
  },

  render() {
    if (this.state.seen === true || this.state.seen === undefined) return (
      null
    )

    return (
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image style={{width:64,height:64}} source={{uri: img}} />
            <Text style={styles.title}>
              Welcome to Watoto
            </Text>
            <View style={[styles.section,{justifyContent:'center',alignItems:'center'}]}>
              <Text style={styles.text}>
                By using this app, you agree to the
              </Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => {
                  Linking.openURL('https://watoto.cyberfish.org/disclaimer')
                }}>
                  <Text style={[styles.text,{color:'#4F8EF7'}]}>
                    Disclaimer
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                  {' and '}
                </Text>
                <TouchableOpacity onPress={() => {
                  Linking.openURL('https://watoto.cyberfish.org/privacy')
                }}>
                  <Text style={[styles.text,{color:'#4F8EF7'}]}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                  .
                </Text>
              </View>
            </View>
            <View style={[styles.section,{justifyContent:'flex-start'}]}>
              <Text style={styles.text}>
                This app has been developed for use by trained medical staff;
                and is a support tool provided for reference only.
                It must be used in conjunction with appropriate professional judgement.
                Fluid prescriptions are in the testing phase. Please sent feedback to andrew.mcardle@gmail.com
              </Text>
            </View>
            <TouchableOpacity onPress={() => {
              this.setSeenDisclaimerState()
            }}>
              <Text style={styles.accept}>
                Accept and Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  },
})

module.exports = Disclaimer
