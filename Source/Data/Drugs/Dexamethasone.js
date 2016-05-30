'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Dexamethasone',
  types: [
    'emergency',
    'other',
  ],
  description: 'Severe Viral Croup:\n0.6 mg/kg stat IV/IM',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var dose = 0.6 * child.weight

    return {
      heading: 'Severe Viral Croup',
      dose: `${DrugUtil.dp(dose,1)} mg stat`,
      route: 'IV / IM',
    }
  }
}

module.exports = Drug
