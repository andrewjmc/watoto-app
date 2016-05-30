'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')

const Drug = {
  name: 'Vitamin D',
  types: [
    'other',
  ],
  description: '' +
    'Treatment:\n Age < 6 mth:\n   3,000 u (75 microgram)\n   24 hrly for 8-12 weeks PO\n Age \u2265 6 mth:\n   6,000 u (150 microgram)\n   24 hrly for 8-12 weeks PO\n   300,000 u (7.5 mg) stat IM' +
    '\n\n' +
    'Maintenance:\n Age < 6 mth:\n   200-400 u (5-10 microgram) 24 hrly PO\n Age \u2265 6 mth:\n   400-800 u (10-20 microgram) 24 hrly PO',
  calculate: (child: Child) => {
    if (!child.age) return undefined

    if (child.age < 6) { // < 6 mths
      return [
        {
          heading: 'Treatment',
          dose: '3,000 u\n(75 microgram) 24 hrly',
          additional: '8-12 week low-dose course',
          route: 'PO',
        },
        {
          heading: 'Maintenance',
          dose: '200-400 u\n(5-10 microgram) 24 hrly',
          additional: 'After treatment course',
          route: 'PO',
        },
      ]
    }

    // >= 6 mths
    return [
      {
        heading: 'Treatment',
        dose: '6,000 u\n(150 microgram) 24 hrly',
        additional: '8-12 week low-dose course',
        route: 'PO',
      },
      {
        dose: '300,000 u (7.5 mg) stat',
        additional: 'Single high-dose course',
        route: 'IM',
      },
      {
        heading: 'Maintenance',
        dose: '400-800 u\n(10-20 microgram) 24 hrly',
        additional: 'After treatment course',
        route: 'PO',
      },
    ]
  }
}

module.exports = Drug
