'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Digoxin',
  types: [
    'other',
  ],
  description: 'Age 2-5 yrs:\nInitially 35_micrograms/kg in 3 divided doses for 24_hrs; then 10_micrograms/kg in 1-2_doses\n\n' +
    'Age 5-10 yrs:\nInitially 25_micrograms/kg (max_750_micrograms) in 3_divided doses for 24_hrs; then 6_micrograms/kg (max_250_micrograms) 24_hrly\n\n' +
    'Age 10-12:\nInitially 0.75-1.5 mg in 3_divided doses for 24_hrs; then 62.5-250_micrograms 24_hrly in 1-2_doses',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 24) return undefined // < 2 yrs

    if (child.age < 60) { // < 5 yrs
      var initialDose = Math.min(35 * child.weight, 750)
      var ongoingDose = Math.min(10 * child.weight, 250)

      return [
        {
          heading: 'Initially',
          dose: `${DrugUtil.dp(initialDose,0)} micrograms\nin 3 divided doses for 24 hrs`,
          route: 'PO',
        },
        {
          heading: 'Then',
          dose: `${DrugUtil.dp(ongoingDose,0)} micrograms\n24 hrly in 1-2 doses`,
          route: 'PO',
        },
      ]
    }

    if (child.age < 120) { // < 10 yrs
      var initialDose = Math.min(25 * child.weight, 750)
      var ongoingDose = Math.min(6 * child.weight, 250)

      return [
        {
          heading: 'Initially',
          dose: `${DrugUtil.dp(initialDose,0)} micrograms\nin 3 divided doses for 24 hrs`,
          route: 'PO',
        },
        {
          heading: 'Then',
          dose: `${DrugUtil.dp(ongoingDose,0)} micrograms\n24 hrly in 1-2 doses`,
          route: 'PO',
        },
      ]
    }

    if (child.age < 156) { // < 13 yrs
      return [
        {
          heading: 'Initially',
          dose: '0.75-1.5 mg\nin 3 divided doses for 24 hrs',
          route: 'PO',
        },
        {
          heading: 'Then',
          dose: '62.5-250 micrograms\n24 hrly in 1-2 doses',
          route: 'PO',
        },
      ]
    }

    return undefined
  }
}

module.exports = Drug
