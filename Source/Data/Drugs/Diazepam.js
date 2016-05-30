'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Diazepam',
  types: [
    'emergency',
    'anticonvulsant',
    'other',
  ],
  description: 'IV: 0.3 mg/kg stat\nPR: 0.5 mg/kg stat',
  warning: 'Not used in neonates',
  additional: 'For PR administration, the whole syringe barrel of a 1_or_2 ml syringe should be inserted gently so that the PR dose is given at a depth of 4-5_cm',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 1) return undefined // < 1 mth

    const MG2ML = (10/2)

    var doseMgIV = Math.min(0.3 * child.weight, 10)
    var doseMlIV = DrugUtil.numberStep(doseMgIV / MG2ML, 0.05)

    var doseMgPR = Math.min(0.5 * child.weight, 10)
    var doseMlPR = DrugUtil.numberStep(doseMgPR / MG2ML, 0.1)

    return [
      {
        dose: `${DrugUtil.dp(doseMgIV,1)} mg stat\n${DrugUtil.dp(doseMlIV,2)} ml (10mg/2ml) stat`,
        route: 'IV',
      },
      {
        dose: `${DrugUtil.dp(doseMgPR,1)} mg stat\n${DrugUtil.dp(doseMlPR,1)} ml (10mg/2ml) stat`,
        route: 'PR',
      },
    ]
  }
}

module.exports = Drug
