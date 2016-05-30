'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Benzyl Penicillin',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Newborn: 50,000 iu/kg 12 hrly\nOtherwise: 50,000 iu/kg 6 hrly\n(IV / IM)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var dose = 50000 * child.weight
    if (child.weight <= 2) { // <= 2 kg; round to nearest 25,000 iu
      dose = DrugUtil.numberStep(dose, 25000)
    }
    else { // > 2 kg round to nearest 50,000 iu
      dose = DrugUtil.numberStep(dose, 50000)
    }

    if (child.age < 0.25) { // <= 1 week
      return {
        dose: `${DrugUtil.dp(dose,0)} iu 12 hrly`,
        route: 'IV / IM',
      }
    }

    // > 1 week
    return {
      dose: `${DrugUtil.dp(dose,0)} iu 6 hrly`,
      route: 'IV / IM',
    }
  }
}

module.exports = Drug
