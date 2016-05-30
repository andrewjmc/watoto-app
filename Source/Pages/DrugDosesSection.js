'use strict'

import React from 'react'
import {
  Platform,
  StyleSheet,
  ScrollView,
  RecyclerViewBackedScrollView,
  TouchableHighlight,
  View,
  ListView,
  Text,
} from 'react-native'

const _ = require('lodash')
const Ionicons = require('../UI/Ionicons') // react-native-vector-icons/Ionicons

const GLOBAL = require('../Globals')
const Router = require('../Router')
const DrugRegistry = require('../Data/DrugRegistry')

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    paddingTop: (8 + (2 * GLOBAL.SCREEN_PADDING)),
    paddingBottom: (8 + (2 * GLOBAL.SCREEN_PADDING)),
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
  },
  sectionHeader: {
    paddingLeft: 8,
    backgroundColor: '#EEE',
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  separator: {
    height: GLOBAL.PIXEL,
    backgroundColor: '#CCC',
  },
  label: {
    flex: 6,
    fontSize: 20,
    color: '#000',
  },
  calculate: {
    flex: 3,
    fontSize: 12,
    color: '#000',
    textAlign: 'right',
  },
  next: {
    flex: 1,
    paddingTop: 2,
    fontSize: 24,
    color: '#4F8EF7',
    textAlign: 'right',
  },
})

const DrugDosesSection = React.createClass({
  getInitialState() {
    var rawData = DrugRegistry.getForType(this.props.type)
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })

    if (rawData.length > 8) {
      var data = {}
      _.forEach(rawData, (drug, file) => {
        var letter = drug.name.substr(0,1)
        if (!data[letter]) {
          data[letter] = [drug]
        }
        else {
          data[letter].push(drug)
        }
      })
      return {
        sections: true,
        dataSource: ds.cloneWithRowsAndSections(data),
      }
    }

    return {
      sections: false,
      dataSource: ds.cloneWithRows(rawData),
    }
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderSectionHeader={this._renderSectionHeader}
        renderRow={this._renderRow}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        renderSeparator={(s, r) => <View key={`sep-${s}-${r}`} style={styles.separator} />}
      />
    )
  },

  _renderSectionHeader(sectionData, sectionName) {
    if (!this.state.sections) return (<View />)

    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          {sectionName}
        </Text>
      </View>
    )
  },

  _renderRow(row, s: number, r: number) {
    return (
      <ScrollView>
        <TouchableHighlight underlayColor='#EEE' onPress={() => {
          this.props.navigator.push(Router.DrugDoseInfo(
            this.props.state, row.name, row.shortName
          ))
        }}>
          <View style={styles.section}>
            <Text ref={`drug-${s}-${r}`} style={styles.label}>
              {row.name}
            </Text>
            <Ionicons style={styles.next} name='chevron-right' />
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  },
})

module.exports = DrugDosesSection
