'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Ibuprofen',
  types: [
    'analgesic',
    'other',
  ],
  description: '5-10 mg/kg 8 hrly PO',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 1) return undefined // < 1 mth

    var dose0 = Math.min(5 * child.weight, 300)
    var dose1 = Math.min(10 * child.weight, 400)

    return {
      dose: `${DrugUtil.dp(dose0,0)}-${DrugUtil.dp(dose1,0)} mg 8 hrly`,
      route: 'PO',
    }
  }
}

module.exports = Drug
