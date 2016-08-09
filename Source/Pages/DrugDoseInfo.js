'use strict'

import React from 'react'
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

const _ = require('lodash')
const GLOBAL = require('../Globals')
const Network = require('../Network')
const DrugRegistry = require('../Data/DrugRegistry')

const Router = require('../Router')

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingTop: 0,
  },
  section: {
    paddingTop: (8 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (8 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    flex: 1,
    borderColor: '#ccc',
    borderBottomWidth: GLOBAL.PIXEL,
  },
  sectionBorderless: {
    paddingTop: (8 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (8 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    flex: 1,
  },
  sectionDose: {
    paddingTop: (8 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (4 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'column',
    borderColor: '#ccc',
    borderBottomWidth: GLOBAL.PIXEL,
  },
  sectionWarning: {
    paddingTop: (0 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (2 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF294',
    borderColor: '#ccc',
    borderBottomWidth: GLOBAL.PIXEL,
  },
  sectionLabel: {
    width: 175,
    marginTop: (1 + GLOBAL.SCREEN_PADDING),
    marginBottom: (3 + GLOBAL.SCREEN_PADDING),
    flex: 2,
    fontSize: 20,
    textAlign: 'left',
    color: '#000',
  },
  calculationContainer: {
  	flexDirection: 'row',
  	alignItems: 'center'
  },
  calculation: {
  	flex: 1
  },
  calculateHeading: {
    marginBottom: (2 + GLOBAL.SCREEN_PADDING),
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
  },
  calculateRoute: {
    marginTop: (1 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
  },
  calculateAdditional: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
  },
  calculateText: {
    flex: 1,
    fontSize: 22,
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
  },
  calculateNoText: {
    flex: 1,
    fontSize: 22,
    fontStyle: 'italic',
    color: '#aaa',
    alignSelf: 'center',
    textAlign: 'center',
  },
  warningText: {
    marginTop: (Platform.OS == 'android' ? 4 : 0),
    marginBottom: (Platform.OS == 'android' ? 2 : 0),
    flex: 1,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#000',
    lineHeight: 20,
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  definitionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  definitionText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#aaa',
    textAlign: 'center',
    marginLeft: 6,
    marginRight: 6,
  },
  dripRate: {
  	flexDirection: 'row',
  	width: 50,
  	height: 50,
  	backgroundColor: 'green',
  	alignItems: 'center'
  },
  dripRateText: {
  	color: 'white',
  	textAlign: 'center'
  }
})

const DrugDoseInfo = React.createClass({
  componentDidMount() {
    Network.get().visit('drug', this.props.name)
  },
  getInitialState() {
    return {
      drug: DrugRegistry.get(this.props.name),
    }
  },
  render() {
    return (
      <ScrollView ref='container' style={styles.container}>
        {this._renderWarning()}
        {this._renderCalculations()}
        <View style={styles.section}>
          <Text ref='description' style={styles.descriptionText}>
            {
              this.state.drug.description
                .replace(/_/g, '\u00A0') // replace _ with a non-breaking-space
            }
          </Text>
        </View>
        {this._renderAdditional()}
        <View style={[styles.sectionBorderless,{flexDirection:'column',alignItems:'center'}]}>
          <View style={styles.definitionView}>
            <Text style={styles.definitionText}>Pre-term: {'<'} 37 weeks</Text>
          </View>
          <View style={styles.definitionView}>
            <Text style={styles.definitionText}>Newborn: {'\u2264'} 7 days</Text>
            <Text style={styles.definitionText}>Neonate: {'\u2264'} 28 days</Text>
          </View>
          <View style={styles.definitionView}>
            <Text style={styles.definitionText}>Infant: 1-12 months</Text>
            <Text style={styles.definitionText}>Child: {'\u2265'} 1 year</Text>
          </View>
        </View>
      </ScrollView>
    )
  },
  _renderCalculations() {
    var calculations = this.state.drug.calculate(this.props.state.child)

    var render
    if (_.isArray(calculations)) {
      var isFluid = (this.state.drug.types.indexOf('fluids') > -1)
      render = []
      _.forEach(calculations, (x, i) => {
        render.push(this._renderCalculation(x, i, isFluid))
      })
    }
    else if (_.isPlainObject(calculations)) {
      var isFluid = (this.state.drug.types.indexOf('fluids') > -1)
      render = this._renderCalculation(calculations, 0, isFluid)
    }
    // Remove me when drugs have been upgraded
    else if (_.isString(calculations)) {
      var isFluid = (this.state.drug.types.indexOf('fluids') > -1)
      render = this._renderCalculation({dose:calculations}, 0, isFluid)
    }
    else {
      render = this._renderCalculation({dose:undefined})
    }

    return (
      <View style={styles.sectionDose}>
        {render}
      </View>
    )
  },
  _renderCalculation(calculation, index = 0, isFluid = false) {
    var calculationStyle = !calculation.dose ? styles.calculateNoText : styles.calculateText
    var calculationText = !calculation.dose ? 'No dose available' : calculation.dose

    return (
      <View key="0" style={styles.calculationContainer}>
      <View key={`calculation-${index}`} style={[styles.calculation,{paddingTop:2,paddingBottom:6}]}>
        {!calculation.heading ? null :
          <Text ref={`calculation-${index}-heading`} style={styles.calculateHeading}>
            {
              calculation.heading
                .replace(/_/g, '\u00A0') // replace _ with a non-breaking-space
            }
          </Text>}
        <Text ref={`calculation-${index}-dose`} style={calculationStyle}>
          {
            calculationText
              .replace(/_/g, '\u00A0') // replace _ with a non-breaking-space
          }
        </Text>
        {!calculation.additional ? null :
          <Text ref={`calculation-${index}-additional`} style={styles.calculateAdditional}>
            {
              calculation.additional
                .replace(/_/g, '\u00A0') // replace _ with a non-breaking-space
            }
          </Text>}
        {!calculation.route ? null :
          <Text ref={`calculation-${index}-route`} style={styles.calculateRoute}>
            {
              calculation.route
                .replace(/_/g, '\u00A0') // replace _ with a non-breaking-space
            }
          </Text>}
      </View>
      	{isFluid ? 
        <TouchableHighlight style={styles.dripRate} underlayColor="#EEE" onPress={()=>{
        	this.props.navigator.push(Router.DripRate(this.props.state, this.state.drug, calculation.volume, calculation.time))
        }}>
          <Text style={styles.dripRateText}>Drip rate</Text>
        </TouchableHighlight>
        :
        <View></View>
        }
      </View>
    )
  },
  _renderAdditional() {
    if (!this.state.drug.additional) return

    return (
      <View style={styles.section}>
        <Text ref='additional' style={styles.descriptionText}>
          {
            this.state.drug.additional
              .replace(/_/g, '\u00A0') // replace _ with a non-breaking-space
          }
        </Text>
      </View>
    )
  },
  _renderWarning() {
    if (!this.state.drug.warning) return

    return (
      <View style={styles.sectionWarning}>
        <Text ref='warning' style={styles.warningText}>
          {
            this.state.drug.warning
              .replace(/_/g, '\u00A0') // replace _ with a non-breaking-space
          }
        </Text>
      </View>
    )
  },
})

module.exports = DrugDoseInfo
