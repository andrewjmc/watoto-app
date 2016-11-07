'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Blood transfusion',
  types: [
    'fluids',
    'other',
  ],
  description: 'For non-malnourished children, blood transfusions can be given as 20 ml/kg of whole blood or 10 ml/kg packed cells over 3-4 hours.\n\nFor malnourished children 10 ml/kg of whole blood is given over 3 hours.',
  additional: '',
  fluidType: 'blood',
  
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined
	
    var ret = [
      {
        heading: 'Whole blood',
        dose: '',
        route: 'IV',
        time: null,
      }
    ]

	if (child.malnutrition != 'SAM'){
		var volumeWB = DrugUtil.numberStep(child.weight * 20,10,2)
    	var volumePC = DrugUtil.numberStep(child.weight * 10,10,2)
		ret[0].dose = `${volumeWB} ml over 3-4 hours`;
		ret[0].volume = volumeWB;
		ret[0].time = 4;
		ret.push({
        	heading: 'Packed cells',
        	dose: `${volumePC} ml over 3-4 hours`,
        	route: 'IV',
        	time: 4,
        	volume: volumePC,
      	});
	}
	else{
		var volumeWB = DrugUtil.numberStep(child.weight * 10,10,2)
		ret[0].dose = `${volumeWB} ml over 3 hours`;
		ret[0].volume = volumeWB;
		ret[0].time = 3;
	}

    return ret
  }
}

module.exports = Drug
