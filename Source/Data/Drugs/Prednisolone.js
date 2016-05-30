'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Prednisolone',
  types: [
    'other',
  ],
  description: 'Asthma: 2 mg/kg 24 hrly PO\n(usually for 3-5 days)',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var dose = Math.min(2 * child.weight, 40)

    return {
      heading: 'Asthma',
      dose: `${DrugUtil.dpTiers(dose,{10:1})} mg 24 hrly`,
      additional: 'Usually for 3-5 days',
      route: 'PO',
    }
  }
}

module.exports = Drug
