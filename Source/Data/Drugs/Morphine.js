'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Morphine',
  types: [
    'analgesic',
    'other',
  ],
  description: 'Neonate:\n - 0.05-0.2 mg/kg 4 hrly IM/SC/Slow_IV\n' +
    'Infant/Child:\n - 0.2-0.5_mg/kg 4-6_hrly (as_needed) PO\n - 0.1-0.2_mg/kg 2-4_hrly (as_needed) IM/SC/IV\n(max 15 mg)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    const dp = [{1:2},{otherwise:1}]

    if (child.age < 1) { // < 1 mth
      var dose0 = Math.min(0.05 * child.weight, 15)
      var dose1 = Math.min(0.2 * child.weight, 15)

      return {
        dose: `${DrugUtil.dpTiers(dose0,...dp)}-${DrugUtil.dpTiers(dose1,...dp)} mg 4 hrly`,
        route: 'IM / SC / Slow IV',
      }
    }

    // >= 1 mth
    var dosePO0 = Math.min(0.2 * child.weight, 15)
    var dosePO1 = Math.min(0.5 * child.weight, 15)

    var doseInj0 = Math.min(0.1 * child.weight, 15)
    var doseInj1 = Math.min(0.2 * child.weight, 15)

    return [
      {
        dose: `${DrugUtil.dpTiers(dosePO0,...dp)}-${DrugUtil.dpTiers(dosePO1,...dp)} mg\n4-6 hrly as needed`,
        route: 'PO',
      },
      {
        dose: `${DrugUtil.dpTiers(doseInj0,...dp)}-${DrugUtil.dpTiers(doseInj1,...dp)} mg\n2-4 hrly as needed`,
        route: 'IM / SC / IV',
      },
    ]
  }
}

module.exports = Drug
