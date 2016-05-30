'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Phenytoin',
  types: [
    'emergency',
    'anticonvulsant',
    'other',
  ],
  description: 'Age 1 month-12 yrs:' +
    '\n- Loading dose: 15-20 mg/kg stat\n(IV / PO; max rate 1 mg/kg/min)\n- Maintenance: 2.5-5 mg/kg 12 hrly\n(IV / PO; max 150 mg)\n' +
    '\nSimilar dosing can be used in neonates',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var loadingDose0 = 15 * child.weight
    var loadingDose1 = 20 * child.weight
    var loadingMaxRate = 1 * child.weight

    var maintenanceDose0 = Math.min(2.5 * child.weight, 150)
    var maintenanceDose1 = Math.min(5 * child.weight, 150)

    return [
      {
        heading: 'Loading Dose',
        dose: `${DrugUtil.dp(loadingDose0,0)}-${DrugUtil.dp(loadingDose1,0)} mg stat`,
        additional: `IV rate not exceeding ${DrugUtil.dpTiers(loadingMaxRate,{10:1})} mg/min`,
        route: 'IV / PO',
      },
      {
        heading: 'Maintenance',
        dose: `${DrugUtil.dpTiers(maintenanceDose0,{10:1})}-${DrugUtil.dpTiers(maintenanceDose1,{10:1})} mg 12 hrly`,
        route: 'IV / PO',
      },
    ]
  }
}

module.exports = Drug
