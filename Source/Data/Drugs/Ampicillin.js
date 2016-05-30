'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Ampicillin',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Newborn: 50 mg/kg 12 hrly\nNeonate: 50 mg/kg 8 hrly\nOtherwise: 50 mg/kg 6 hrly\n(IV / IM; max 500 mg)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var dose = Math.min(50 * child.weight, 500)

    var doseText
    if (child.age < 0.25) { // <= 7 days
      doseText = `${DrugUtil.dp(dose,0)} mg 12 hrly`
    }
    else if (child.age < 1) { // < 1 mth
      doseText = `${DrugUtil.dp(dose,0)} mg 8 hrly`
    }
    else {
      doseText = `${DrugUtil.dp(dose,0)} mg 6 hrly`
    }

    return {
      dose: doseText,
      route: 'IV / IM',
    }
  }
}

module.exports = Drug
