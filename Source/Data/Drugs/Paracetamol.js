'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Paracetamol',
  types: [
    'analgesic',
    'other',
  ],
  description: '10-15 mg/kg 6-8 hrly PO/IV',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var dose0 = Math.min(10 * child.weight, 1000)
    var dose1 = Math.min(15 * child.weight, 1000)

    return {
      dose: `${DrugUtil.dp(dose0,0)}-${DrugUtil.dp(dose1,0)} mg 6-8 hrly`,
      route: 'PO / IV',
    }
  }
}

module.exports = Drug
