'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Aminophylline',
  types: [
    'other',
  ],
  description: 'Loading Dose:\n  Newborn: 6 mg/kg IV over 1 hour (or PR)\nMaintenance (IV or PO):\n  Newborn: 2.5 mg/kg 12 hrly\n  Neonate: 4 mg/kg 12 hrly',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 0.25) { // <= 1 week
      var loadingDose = 6 * child.weight
      var maintenanceDose = 2.5 * child.weight

      return [
        {
          heading: 'Loading Dose',
          dose: `${DrugUtil.dp(loadingDose,0)} mg over 1 hour`,
          route: 'IV (or PR)',
        },
        {
          heading: 'Maintenance',
          dose: `${DrugUtil.dp(maintenanceDose,1)} mg 12 hrly`,
          route: 'IV / PO',
        },
      ]
    }

    if (child.age < 1) { // < 1 mth
      var dose = 4 * child.weight

      return {
        heading: 'Maintenance',
        dose: `${DrugUtil.dp(dose,0)} mg 12 hrly`,
        route: 'IV / PO',
      }
    }

    return undefined
  } 
}

module.exports = Drug
