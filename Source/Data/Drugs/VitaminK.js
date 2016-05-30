'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Vitamin K',
  types: [
    'other',
  ],
  description: 'Newborn:\n Weight < 1.5 kg; 0.5 mg stat IM\n Otherwise: 1 mg stat IM\n\n' +
    'Liver Disease:\n 0.3 mg/kg stat Slow IV (max 10_mg)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var ret = []
    if (child.age < 0.25) { // <= 1 week
      var newbornDose
      if (child.weight < 1.5) newbornDose = 0.5
      else newbornDose = 1

      ret.push({
        heading: 'Newborn',
        dose: `${newbornDose} mg stat`,
        route: 'IM',
      })
    }

    // > 1 week
    var liverDose = Math.min(0.3 * child.weight, 10)
    ret.push({
      heading: 'Liver Disease',
      dose: `${DrugUtil.dpTiers(liverDose, {1:2,10:1})} mg stat`,
      additional: 'max 10 mg',
      route: 'Slow IV',
    })

    return ret
  }
}

module.exports = Drug
