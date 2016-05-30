'use strict'

const udef = undefined

const _ = require('lodash')

// age in months * 100 -> [weight estimate, underweight estimate]
const table = {
    23: [  3.0, udef], //  1 week+
    92: [  4.0, udef], //  4 weeks+
   184: [  5.0,  3.0], //  8 weeks+ (/2 months+) gap in range in document due to week/month scale shift
   400: [  7.0,  4.0], //  4 months+
   700: [  9.0,  5.0], //  7 months+
  1000: [ 10.0,  7.0], // 10 months+
  1200: [ 11.0,  9.0], //  1 year+ (/12 months+) overlap in range in document due to month/year scale shift
  2400: [ 13.0, 10.0], //  2 years+
  3600: [ 15.0, 11.0], //  3 years+
  4800: [ 17.0, 13.0], //  4 years+
}

module.exports = {
  getEstimate: (age, underweight) => {
    if (!age) return undefined

    var ageScaled = age * 100
    if (ageScaled > 6000) return undefined // > 5 years

    var keys = _.keys(table)
      .sort((a,b) => { // sort reserve numerically
        return b - a
      })

    var key = _.find(keys, (_key) => {
      return _key <= ageScaled
    })
    if (!key) return undefined

    var ret = table[key][(underweight?1:0)]
    if (!ret) return undefined
    return ret.toFixed(1)
  }
}
