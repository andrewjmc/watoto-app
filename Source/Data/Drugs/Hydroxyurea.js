'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Hydroxyurea',
  types: [
    'other',
  ],
  description: 'Age 2-12 yrs; initially 10-15_mg/kg 24_hrly, increased every 12_weeks in steps of 2.5-5_mg/kg according to the response; usual dose 15-30_kg/mg 24_hrly\n(PO; max_35_mg/kg)',
  warning: 'For severe SCD only; pain_>_3_episodes/yr; stroke; transfusion_\u2265_2/yr; accute chest syndrome',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 24) return undefined // < 2 yrs

    if (child.age < 144) { // < 12 yrs
      var initialDose0 = 10 * child.weight
      var initialDose1 = 15 * child.weight

      var increaseDose0 = 2.5 * child.weight
      var increaseDose1 = 5 * child.weight

      var usualDose0 = 15 * child.weight
      var usualDose1 = 30 * child.weight

      var maxDose = 35 * child.weight

      return [
        {
          heading: 'Initially',
          dose: `${DrugUtil.dp(initialDose0,0)}-${DrugUtil.dp(initialDose1,0)} mg 24 hrly`,
          additional: `Increased every 12 weeks in steps of\n${DrugUtil.dp(increaseDose0,0)}-${DrugUtil.dp(increaseDose1,0)} mg according to the response`,
          route: 'PO',
        },
        {
          heading: 'Usual Dose',
          dose: `${DrugUtil.dp(usualDose0,0)}-${DrugUtil.dp(usualDose1,0)} mg 24 hrly`,
          additional: `max ${DrugUtil.dp(maxDose,0)} mg`,
          route: 'PO',
        },
      ]
    }

    return undefined
  }
}

module.exports = Drug
