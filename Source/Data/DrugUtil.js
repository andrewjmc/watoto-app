'use strict'

const _ = require('lodash')
const Big = require('big.js')

const DrugUtil = {
  fractions: (x) => {
    return String(x)
      .replace(/\.25$/, '\u00BC')
      .replace(/\.5$/, '\u00BD')
      .replace(/\.75$/, '\u00BE')
      .replace(/^0(.+)$/, '$1')
  },

  plural: (x, str) => {
    return str + (x > 1 ? 's' : '')
  },

  // Doesn't support 4+ decimal points
  // 12.3,456 :(
  format: (x) => {
    return String(x)
      .replace(/\.[0]+$/, '')
      .replace(/(\.[1-9]*)[0]+$/, '$1')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  dp: (x, dp, {round = 1}={}) => {
    if (!_.isNumber(x) || !_.isNumber(dp) || !_.isNumber(round)) {
      return undefined
    }

    return DrugUtil.format(
      new Big(x).round(dp, round)
        .toString()
    )
  },

  dpTiers: (x, tiers, {otherwise = 0}={}) => {
    if (!_.isNumber(x) || (!_.isNumber(tiers) && !_.isPlainObject(tiers)) || !_.isNumber(otherwise)) {
      return undefined
    }

    var tierKeys = _.keys(tiers)
      .sort((a,b) => {
        return a - b
      })
    var tierKey = _.find(tierKeys, (_key) => {
      return x < _key
    })

    return DrugUtil.format(
      new Big(x).toFixed(tierKey == undefined ? otherwise : tiers[tierKey])
        .toString()
    )
  },

  // Round:- 0 = Floor; 1 = Nearest (Half Up); 2 = Nearest (Half Even); 3 = Ceil
  numberStep: (x, step, {otherwise = 1, round = 1}={}) => {
    if (!_.isNumber(x) || (!_.isNumber(step) && !_.isPlainObject(step)) || !_.isNumber(otherwise) || !_.isNumber(round)) {
      return undefined
    }

    if (_.isPlainObject(step)) {
      var stepKeys = _.keys(step)
        .sort((a,b) => {
          return a - b
        })
      var stepKey = _.find(stepKeys, (_key) => {
        return x < _key
      })
      step = (stepKey == undefined ? otherwise : step[stepKey])
    }

    // Previously raw JS Math; but float bugs!
    // return Math.round(x / step) * step
    return parseFloat(
      new Big(x).div(step)
        .round(0, round)
        .times(step)
        .toString()
    )
  },
}

module.exports = DrugUtil
