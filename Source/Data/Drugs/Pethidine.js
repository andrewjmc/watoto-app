'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Pethidine',
  types: [
    'analgesic',
    'other',
  ],
  description: '0.5-1 mg/kg 4-6 hrly IM',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 1) return undefined // < 1 mth

    var dose0 = 0.5 * child.weight
    var dose1 = 1 * child.weight

    var dp = [{1:2},{otherwise:1}]
    return {
      dose: `${DrugUtil.dpTiers(dose0,...dp)}-${DrugUtil.dpTiers(dose1,...dp)} mg 4-6 hrly`,
      route: 'IM',
    }
  } 
}

module.exports = Drug
