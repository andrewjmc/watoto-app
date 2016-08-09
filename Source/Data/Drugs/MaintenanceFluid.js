'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Maintenance fluid',
  types: [
    'fluids',
    'other',
  ],
  description: 'Maintenance fluids are calculated as 100 ml/kg/d for the first 10 kg body weight, 50 ml/kg/d for the second 10 kg, and 25 ml/kg/d for any weight above 20kg.\n\nNormal saline with 5% dextrose is the fluid of choice.\n\nIV maintenance fluids should be avoided for malnourished children, but if they are needed, use Ringer\'s lactate with 5% dextrose.',
  additional: 'To make normal saline with 5% dextrose if it is not available, remove and discard 50 ml from 500 ml normal saline, and add 50 ml of 50% dextrose.',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var volume = child.weight <= 10 ? child.weight * 100 : (child.weight <= 20 ? 1000 + (child.weight - 10) * 50 : 1500 + (child.weight - 20) * 25)
	
    var ret = [
      {
        heading: 'Daily maintenance fluid',
        dose: `${DrugUtil.numberStep(volume,50,2)} ml of the appropriate fluid (see below)`,
        route: 'IV, NG or oral',
        time: 24,
        volume: volume
      },
    ]

    return ret
  }
}

module.exports = Drug
