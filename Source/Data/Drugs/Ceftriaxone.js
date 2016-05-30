'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Ceftriaxone',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Neonates:\n  50 mg/kg 24 hrly\nMeningitis / Very Severe Sepsis:\n  50_mg/kg 12_hrly\n(IV / IM; max 4_g/24_hrs)',
  warning: 'Not recommended if jaundiced or newborn',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 1) { // < 1 mth
      var dose = Math.min(50 * child.weight, 2000)
      if (child.weight < 1.5) {
        dose = DrugUtil.numberStep(dose, 12.5)
      }
      else {
        // -0.001 mg, to ensure 2.0 kg rounds down to 75 mg as per ETAT table
        dose = DrugUtil.numberStep(dose - 0.001, 25)
      }

      return {
        dose: `${DrugUtil.dpTiers(dose,{75:1})} mg 24 hrly`,
        additional: (child.age < 0.25 ? 'Not recommended, consider Cefotaxime' : null),
        route: 'IV / IM',
      }
    }

    // >= 1 mth
    var dose = Math.min(50 * child.weight, 2000)
    dose = DrugUtil.numberStep(dose, 25)

    return {
      heading: 'Meningitis / Very Severe Sepsis',
      dose: `${DrugUtil.dpTiers(dose,{75:1})} mg 12 hrly`,
      additional: 'max 4 grams per 24 hrs',
      route: 'IV / IM',
    }
  }
}

module.exports = Drug
