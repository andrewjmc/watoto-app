'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Ciprofloxacin',
  types: [
    'antibiotic',
    'other',
  ],
  description: '15 mg/kg 12 hrly PO for 3 days',
  warning: 'May increase renal toxicity of\nGentamicin/Amikacin',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 1) return undefined // < 1 mth
    if (child.weight < 4) return undefined // < 4 kg

    var dose = Math.min(15 * child.weight, 750)
    var tabs = dose / 250

    if (dose <= 150) tabs = DrugUtil.numberStep(tabs, 0.25)
    else tabs = DrugUtil.numberStep(tabs, 1)

    return {
      dose: `${DrugUtil.dp(dose,0)} mg 12 hrly\n${DrugUtil.fractions(tabs)} (250 mg) ${DrugUtil.plural(tabs,'tablet')} 12 hrly`,
      additional: 'For 3 days',
      route: 'PO',
    }
  }
}

module.exports = Drug
