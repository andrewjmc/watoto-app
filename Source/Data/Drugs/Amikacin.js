'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Amikacin',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Age 1 mth - 12 yrs: 15 mg/kg once daily\nSlow IV over 3-5 min\nSame dosing can be used with newborns',
  warning: 'Amikacin trough concentration should be monitored (if available)',
  additional: 'If serious gram -ve infection / resistance to Gentamicin, higher doses maybe used with monitoring',
  calculate: (child: Child) => {
    if (!child.age) return undefined

    if (child.age < 156) { // < 13 yrs
      var dose = Math.min(15 * child.weight, 500)

      return {
        dose: `${DrugUtil.dp(dose,0)} mg 24 hrly`,
        route: 'Slow IV (over 3-5 min)',
      }
    }

    return undefined
  } 
}

module.exports = Drug
