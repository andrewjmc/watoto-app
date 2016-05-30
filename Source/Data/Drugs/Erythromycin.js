'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Erythromycin',
  types: [
    'antibiotic',
    'other',
  ],
  description: '30-50 mg/kg 24_hrly in 3-4_divided doses\n(PO; max 2 g)',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var dose0 = Math.min(30 * child.weight, 2000)
    var dose1 = Math.min(50 * child.weight, 2000)

    return {
      dose: `${DrugUtil.dp(dose0,0)}-${DrugUtil.dp(dose1,0)} mg 24 hrly\nin 3-4 divided doses`,
      route: 'PO',
    }
  }
}

module.exports = Drug
