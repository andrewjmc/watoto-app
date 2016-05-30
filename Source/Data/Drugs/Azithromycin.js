'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Azithromycin',
  types: [
    'antibiotic',
    'other',
  ],
  description: '10 mg/kg 24 hrly PO for 3 days\n(max 500 mg)',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var dose = Math.min(10 * child.weight, 500)

    return {
      dose: `${DrugUtil.dp(dose,0)} mg 24 hrly`,
      additional: 'For 3 days',
      route: 'PO',
    }
  }
}

module.exports = Drug
