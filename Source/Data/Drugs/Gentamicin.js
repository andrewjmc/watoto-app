'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Gentamicin',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Newborn < 2 kg: 3.0 mg/kg 24 hrly\nNewborn ≥ 2 kg: 5.0 mg/kg 24 hrly\nOtherwise: 7.5 mg/kg 24 hrly\n(IM / Slow IV)',
  warning: 'Consider stopping if not obviously passing urine after more than 24 hours',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var mg
    if (child.age < 0.25) { // <= 1 week
      if (child.weight < 2) mg = 3
      else mg = 5
    }
    else mg = 7.5

    var dose = mg * child.weight
    dose = DrugUtil.numberStep(dose, {20:0.5}, {otherwise:1})

    return {
      dose: `${dose} mg 24 hrly`,
      route: 'IM / Slow IV',
    }
  }
}

module.exports = Drug
