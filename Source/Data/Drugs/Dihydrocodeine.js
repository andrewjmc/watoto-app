'use strict'

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Dihydrocodeine',
  types: [
    'analgesic',
    'other',
  ],
  description: 'Age 1-4 yrs: 0.5 mg/kg 4-6 hrly\nAge 4-12 yrs: 0.5-1.0 mg/kg 4-6 hrly\n(PO; max 30 mg)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 12) return undefined // < 1 yr

    if (child.age < 48) { // < 2 yrs
      var dose = Math.min(0.5 * child.weight, 30)

      return {
        dose: `${DrugUtil.dp(dose,1)} mg 4-6 hrly`,
        route: 'PO',
      }
    }

    if (child.age < 144) { // < 12 yrs
      var dose0 = Math.min(0.5 * child.weight, 30)
      var dose1 = Math.min(1.0 * child.weight, 30)

      return {
        dose: `${DrugUtil.dp(dose0,1)}-${DrugUtil.dp(dose1,1)} mg 4-6 hrly`,
        route: 'PO',
      }
    }

    return undefined
  }
}

module.exports = Drug
