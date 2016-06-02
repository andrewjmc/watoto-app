'use strict'

const _ = require('lodash')

module.exports = {
  getScore: (muac) => {
    if (!_.isNumber(muac)) return undefined

    if (muac <  5.0) return undefined
    if (muac < 11.5) return -3
    if (muac < 12.5) return -2
    if (muac < 13.5) return -1
    if (muac < 30.0) return  0

    return undefined
  }
}
