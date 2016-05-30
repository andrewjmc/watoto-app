'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Quinine',
  types: [
    'other',
  ],
  description: 'Loading Dose: 20 mg/kg stat\n(IV Infusion / IM)\nMaintenance: 10 mg/kg 8 hrly\n(IV Infusion / IM / PO)\n\n' +
    'Quinine Sulphate tablets\n200 mg tablet = 165 mg Quinine',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var loadingDose = 20 * child.weight
    var maintenanceDose = Math.min(10 * child.weight, 500)

    // 100 mg Quinine = 121 mg Quinine Sulphate
    // hence 200 mg QS tablet = 165 mg Quinine
    const Q2QS = (121/100)

    // + 0.02 (1/50th) tablet to the pre-rounded dose to align rounding to ETAT table
    var tabs = DrugUtil.numberStep((maintenanceDose / 200) * Q2QS + 0.02, 0.25)

    var ret = [
      {
        heading: 'Loading Dose',
        dose: `${DrugUtil.dp(loadingDose,0)} mg stat`,
        route: 'IV Infusion / IM',
      },
      {
        heading: 'Maintenance',
        dose: `${DrugUtil.dp(maintenanceDose,0)} mg 8 hrly`,
        route: 'IV Infusion / IM',
      },
    ]

    if (tabs > 0) {
      ret.push({
        dose: `${DrugUtil.fractions(tabs)} (200mg) ${DrugUtil.plural(tabs, 'tablet')} 8 hrly`,
        additional: 'Quinine Sulphate',
        route: 'PO',
      })
    }

    return ret
  }
}

module.exports = Drug
