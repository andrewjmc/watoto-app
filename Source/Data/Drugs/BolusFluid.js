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
  description: 'For non-malnourished children, bolus fluids are calculated as 10 ml/kg of normal saline or Ringer\'s lactate over 30 minutes and can be repeated up to three times.\n\nFor malnourished children bolus fluids are calculated as 10-15 ml/kg over one hour of Ringer\'s lactate and 5% dextrose, with no repeat.\n\nFor either child, blood transfusion can be given if shock persists after treatment.',
  
  additional: '',
  fluidType: 'fluid',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

	var ret = [
      {
        heading: 'Bolus fluid',
        dose: undefined,
        route: 'IV',
        time: undefined,
        volume: undefined
      },
    ]

    if (child.malnutrition != 'SAM'){
    	var volume = DrugUtil.numberStep(child.weight * 10,5,2)
		var minVolume = DrugUtil.numberStep(child.weight * 10,5,2)
		var maxVolume = DrugUtil.numberStep(child.weight * 10,5,2)
		ret[0].dose = `${volume} ml of normal saline or Ringer's lactate` + (child.malnutrition == 'Unknown' ? ' if not severely malnourished' : '')
		ret[0].volume = volume
		ret[0].minVolume = minVolume
		ret[0].maxVolume = maxVolume
		ret[0].time = 0.5
	}
	else{
		var volume = DrugUtil.numberStep(child.weight * 15,5,2)
		var minVolume = DrugUtil.numberStep(child.weight * 10,5,2)
		var maxVolume = DrugUtil.numberStep(child.weight * 15,5,2)
		ret[0].dose = `${volume} ml of Ringer's lactate and 5% dextrose`
		ret[0].volume = volume
		ret[0].minVolume = minVolume
		ret[0].maxVolume = maxVolume
		ret[0].time = 1
	}
    

    return ret
  }
}

module.exports = Drug
