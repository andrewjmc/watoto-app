'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Artemether Lumefantrine',
  types: [
    'other',
  ],
  description: 'Artemether (20mg)\nLumefantrine (120mg)\n\nWeight < 5 kg: \u00BD tablet\nWeight 5-15 kg: 1 tablet\nWeight 15-24 kg: 2 tablets\nWeight 25-34 kg: 3 tablets\n\n' +
    'Stat, then 8 hrly for 24 hr, then 12 hrly for days_2_&_3',
  warning: 'Give with food',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    var dose
    if (child.weight < 5) dose = 0.5
    else if (child.weight < 15) dose = 1
    else if (child.weight < 25) dose = 2
    else dose = 3

    return {
      dose: `${DrugUtil.fractions(dose)} ${DrugUtil.plural(dose, 'tablet')} (20+120mg) stat`,
      additional: 'Then 8 hrly for 24 hrs\nand 12 hrly on days 2 & 3',
      route: 'PO',
    }
  }
}

module.exports = Drug
