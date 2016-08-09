'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Bolus fluid',
  types: [
    'fluids',
    'other',
  ],
  description: 'Bolus fluids are calculated as 10-20 ml/kg of normal saline or Ringer\'s lactate over one hour in children without severe acute malnutrition.',
  additional: '',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var volume = child.weight * 20
	
    var ret = [
      {
        heading: 'Bolus fluid',
        dose: `${DrugUtil.numberStep(volume,5,2)} ml of normal saline or Ringer's lactate'`,
        route: 'IV',
        time: 0.5,
        volume: volume
      },
    ]

    return ret
  }
}

module.exports = Drug
