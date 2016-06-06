'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Adrenaline',
  types: [
    'emergency',
    'other',
  ],
  description: 'Resuscitation:\n  0.1 ml/kg of 1:10,000 IV\nSevere Viral Croup:\n  2 ml of 1:1,000 Nebulised\n  If effective, repeat with careful monitoring',
  additional: 'To make 1 in 10,000 strength...\n\nDilute 1 ml of 1:1,000 adrenaline in 9 ml of water for injection to make 10 ml',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var doseResus = Math.min(0.1 * child.weight, 10)

    var ret = [
      {
        heading: 'Resuscitation',
        dose: `${DrugUtil.dp(doseResus,2)} ml of 1:10,000 stat`,
        route: 'IV',
      },
    ]

    if (child.age >= 6) {
      ret.push({
        heading: 'Severe Viral Croup',
        dose: '2 ml of 1:1,000 stat',
        additional: 'If effective, repeat with careful monitoring',
        route: 'Nebulised',
      })
    }

    return ret
  }
}

module.exports = Drug
