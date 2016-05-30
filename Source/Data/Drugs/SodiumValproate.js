'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Sodium Valproate',
  types: [
    'anticonvulsant',
    'other',
  ],
  description: 'Neonate:\n - Loading Dose: 20 mg/kg stat\n - Maintenance: 10 mg/kg 12 hrly\n' +
    'Otherwise:\n - Loading Dose: 10-15 mg/kg (max 600mg)\n  in 1-2 divided doses\n - Maintenance: 25-30 mg/kg 24 hrly\n  in 2 divided doses\n(PO)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 1) { // < 1 month
      var loadingDose = 20 * child.weight
      var maintenanceDose = 10 * child.weight

      return [
        {
          heading: 'Loading Dose',
          dose: `${DrugUtil.dp(loadingDose,0)} mg stat`,
          route: 'PO',
        },
        {
          heading: 'Maintenance',
          dose: `${DrugUtil.dp(maintenanceDose,0)} mg 12 hrly`,
          route: 'PO',
        },
      ]
    }

    // >= 1 month
    var loadingDose0 = Math.min(10 * child.weight, 600)
    var loadingDose1 = Math.min(15 * child.weight, 600)

    var maintenanceDose0 = Math.min(25 * child.weight, 2500)
    var maintenanceDose1 = Math.min(30 * child.weight, 2500)

    return [
      {
        heading: 'Loading Dose',
        dose: `${DrugUtil.dp(loadingDose0,0)}-${DrugUtil.dp(loadingDose1,0)} mg\nin 1-2 divided doses`,
        route: 'PO',
      },
      {
        heading: 'Maintenance',
        dose: `${DrugUtil.dp(maintenanceDose0,0)}-${DrugUtil.dp(maintenanceDose1,0)} mg 24 hrly\nin 2 divided doses`,
        route: 'PO',
      },
    ]
  }
}

module.exports = Drug
