'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Plan C rehydration fluid',
  types: [
    'fluids',
    'other',
  ],
  description: 'Rehydration fluids are calculated as 30 ml/kg/d over 30 minutes (one hour below six months) followed by 70 ml/kg/d over 2 hours 30 minutes (5 hours below six months). If already given a bolus for shock, omit the 30 ml/kg',
  additional: '',
  fluidType: 'fluid',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

	var volume1 = child.weight * 30
	var volume2 = child.weight * 70
	var time1 = child.age < 6 ? 1 : 0.5
	var time2 = child.age < 6 ? 5 : 2.5
	var timeStr1 = child.age < 6 ? "1 hour" : "30 minutes"
	var timeStr2 = child.age < 6 ? "5 hours" : "2 hours 30 minutes"
	
    var ret = [
      {
        heading: 'Plan C Step 1',
        dose: `${DrugUtil.numberStep(volume1,50,2)} ml of Ringer\'s Lactate or normal saline over ${timeStr1}`,
        route: 'IV',
        time: child.age < 6 ? 1 : 0.5,
        volume: DrugUtil.numberStep(volume1,50,2)
      },
      {
        heading: 'Plan C Step 2',
        dose: `${DrugUtil.numberStep(volume2,50,2)} ml of Ringer\'s Lactate or normal saline over ${timeStr2}`,
        route: 'IV',
        time: child.age < 6 ? 5 : 2.5,
        volume: DrugUtil.numberStep(volume2,50,2)
      }
    ]

    return ret
  }
}

module.exports = Drug
