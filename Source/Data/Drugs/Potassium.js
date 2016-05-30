'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Potassium',
  types: [
    'other',
  ],
  description: 'Hypokalemia: 1-4_mmol/kg 24_hrly PO\n(monitor serum potassium)',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var dose0 = Math.min(1 * child.weight, 50)
    var dose1 = Math.min(4 * child.weight, 50)

    return {
      heading: 'Hypokalemia',
      dose: `${DrugUtil.dp(dose0,0)}-${DrugUtil.dp(dose1,0)} mmol 24 hrly`,
      additional: 'Monitor serum potassium',
      route: 'PO',
    }
  }
}

module.exports = Drug
