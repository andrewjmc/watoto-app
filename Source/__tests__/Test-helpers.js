'use strict'

const _ = require('lodash')

const GLOBAL = require('../Globals')

jest.unmock('../Data/Child')
const Child = require('../Data/Child')

const _time = (scale, label, input) => {
  return {
    text: `${input} ${label}`,
    input: input,
    month: (scale * input).toFixed(2),
    scale: {
      value: scale,
    },
  }
}

module.exports = {
  Time: {
    udef: (input) => {
      return {
        text: 'undefined',
        input: input,
        month: undefined,
        scale: {
          value: undefined,
        }
      }
    },
    days: (input) => _time(0.033, 'day', input),
    weeks: (input) => _time(0.23, 'week', input),
    months: (input) => _time(1, 'month', input),
    years: (input) => _time(12, 'year', input),
  },
  Child: {
    create: (props) => {
      var ret = new Child()
      _.forEach(props, (v, k) => {
        ret.set(k, v)
      })
      return ret
    },
    gender: (x) => {
      return _.find(GLOBAL.GENDERS, { 'value': x })
    },
  },
  DrugDose: {
    template(props, decorator) {
      return (dose, extra = {}) => {
        var ret = {}
        _.merge(ret, props, extra, {dose: dose})
        if (decorator) decorator(ret)
        return ret
      }
    },
    toString(drug) {
      if (!drug) return undefined

      var heading = ''
      var additional = ''
      var route = ''

      if (drug.heading) heading = `${drug.heading}: `
      if (drug.additional) additional = ` [${drug.additional}]`
      if (drug.route) route = ` (${drug.route})`

      return `${_.replace(heading, /\n/g, '; ')}${_.replace(drug.dose, /\n/g, '; ')}${_.replace(additional, /\n/g, '; ')}${_.replace(route, /\n/g, '; ')}`
    }
  },
}
