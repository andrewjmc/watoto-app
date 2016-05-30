'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Lorazepam',
  types: [
    'anticonvulsant',
    'other',
  ],
  description: '0.1 mg/kg stat IV over 30-60_seconds\n(max 4 mg)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 1) return undefined // < 1 mth

    var dose = Math.min(0.1 * child.weight, 4)

    return {
      dose: `${DrugUtil.dpTiers(dose,{1:2,10:1})} mg stat`,
      route: 'IV (over 30-60 seconds)',
    }
  }
}

module.exports = Drug
