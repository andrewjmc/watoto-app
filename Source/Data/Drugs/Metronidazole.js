'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Metronidazole',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Neonate: 7.5 mg/kg 12 hrly\nOtherwise: 7.5 mg/kg 8 hrly\n(IV / PO; max 4 g/24 hrs)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    const TABLET = 200

    if (child.age < 0.25) { // <= 1 week
      var dose = 7.5 * child.weight
      dose = DrugUtil.numberStep(dose, 2.5)

      return {
        dose: `${DrugUtil.dp(dose,1)} mg 12 hrly`,
        route: 'IV',
      }
    }

    if (child.age < 1) { // < 1 mth
      // -1 gram to round down to match ETAT table
      var dose = Math.min(7.5 * (child.weight - 0.001), 2000)
      dose = DrugUtil.numberStep(dose, 5)

      return {
        dose: `${DrugUtil.dp(dose,0)} mg 12 hrly`,
        additional: 'max 4 grams per 24 hrs',
        route: 'IV',
      }
    }

    // -1 gram to round down to match ETAT table
    var dose = Math.min(7.5 * (child.weight - 0.001), 2000)
    dose = DrugUtil.numberStep(dose, 5)

    var tabs = dose / TABLET

    // if <= 4 kg; 0 tablets
    if (child.weight <= 4) tabs = 0

    if (tabs < 0.25) {
      // to nearest 1/4 tablet (potentially to 0)
      tabs = DrugUtil.numberStep(tabs, 0.25)
    }
    else {
      // round up to 1/2 tablets
      tabs = DrugUtil.numberStep(tabs, 0.5, {round:3})
    }

    var ret = [{
      dose: `${DrugUtil.dp(dose,0)} mg 8 hrly`,
      additional: 'max 4 grams per 24 hrs',
      route: 'IV',
    }]

    if (tabs > 0) {
      ret.push({
        dose: `${DrugUtil.fractions(tabs)} (200mg) ${DrugUtil.plural(tabs,'tablet')} 8 hrly`,
        route: 'PO',
      })
    }

    return ret
  }
}

module.exports = Drug
