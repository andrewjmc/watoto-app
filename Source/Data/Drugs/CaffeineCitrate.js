'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Caffeine Citrate',
  types: [
    'other',
  ],
  description: 'Loading Dose:\n  20 mg/kg stat PO (or IV over 30_min)\nMaintenance:\n  5 mg/kg 24 hrly PO (or IV over 30_min)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 3) { // < 3 mths
      var loadingDose = 20 * child.weight
      var maintenanceDose = 5 * child.weight

      return [
        {
          heading: 'Loading Dose',
          dose: `${DrugUtil.dp(loadingDose,0)} mg stat`,
          route: 'PO (or IV over 30 min)',
        },
        {
          heading: 'Maintenance',
          dose: `${DrugUtil.dp(maintenanceDose,0)} mg 24 hrly`,
          route: 'PO (or IV over 30 min)',
        },
      ]
    }

    return undefined
  }
}

module.exports = Drug
