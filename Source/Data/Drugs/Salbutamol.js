'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Salbutamol',
  types: [
    'emergency',
    'other',
  ],
  description: 'IV over 5 mins (in hospital only):\n - Age < 2 yrs; 5 microgram/kg\n - Age \u2265 2 yrs; up to 15 microgram/kg\n(max 250 microgram/0.25 mg)\n\n' +
    'Nebulised:\n2.5 mg every 20 min (up to 3 doses)\n\nInhaled (acute exacerbation):\n(100 microgram per puff)\n - Severe: 6 puffs\n - Mild/Moderate: 2 puffs\nevery 20 min (up to 3 doses)',
  warning: 'IV therapy should only be used on an HDU, ideally with a monitor; and MUST be given slowly as directed',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 24) { // < 2 yrs
      var doseIV = Math.min(5 * child.weight, 250)

      return [
        {
          dose: '2.5 mg every 20 min',
          additional: 'up to 3 doses',
          route: 'Nebulised',
        },
        {
          dose: '2-6 puffs every 20 min\n100 microgram per puff',
          additional: 'up to 3 doses',
          route: 'Inhaler via Spacer',
        },
        {
          heading: 'In Hospital Only',
          dose: `${DrugUtil.dp(doseIV,0)} microgram stat`,
          route: 'IV (over 5 mins)',
        },
      ]
    }

    // >= 2 yrs
    var doseIV = Math.min(15 * child.weight, 250)

    return [
      {
        dose: '2.5 mg every 20 min',
        additional: 'up to 3 doses',
        route: 'Nebulised',
      },
      {
        dose: '2-6 puffs every 20 min\n100 microgram per puff',
        additional: 'up to 3 doses',
        route: 'Inhaler via Spacer',
      },
      {
        heading: 'In Hospital Only',
        dose: `up to ${DrugUtil.dp(doseIV,0)} microgram stat`,
        additional: 'max 250 microgram / 0.25 mg',
        route: 'IV (over 5 mins)',
      },
    ]
  }
}

module.exports = Drug
