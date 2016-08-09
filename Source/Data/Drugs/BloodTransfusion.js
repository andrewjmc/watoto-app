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
  description: 'Blood transfusions can be given as 20 ml/kg of whole blood or 10 ml/kg packed cells over 3-4 hours.',
  additional: '',
  fluidType: 'blood',
  
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var volumeWB = DrugUtil.numberStep(child.weight * 20,10,2)
    var volumePC = DrugUtil.numberStep(child.weight * 10,10,2)
	
    var ret = [
      {
        heading: 'Whole blood',
        dose: `${volumeWB} ml over 3-4 hours`,
        route: 'IV',
        time: 4,
        volume: volumeWB,
      },
      {
        heading: 'Packed cells',
        dose: `${volumePC} ml over 3-4 hours`,
        route: 'IV',
        time: 4,
        volume: volumePC,
      }
    ]

    return ret
  }
}

module.exports = Drug
