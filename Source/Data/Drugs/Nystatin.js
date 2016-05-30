'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')

const Drug = {
  name: 'Nystatin',
  types: [
    'other',
  ],
  description: 'Pre-term: 0.5 ml (50,000 iu)\nTerm: 1 ml (100,000 iu)\n\nTo each side of the mouth 6 hrly\n(2 weeks if HIV +ve)',
  calculate: (child: Child) => {
    if (!child.age) return undefined

    if (child.age < 12) { // < 1 yr
      return [
        {
          heading: 'Pre-term Infant',
          dose: '0.5 ml (50,000 iu) to each\nside of the mouth 6 hrly',
          additional: '2 weeks if HIV +ve',
          route: 'PO',
        },
        {
          heading: 'Term Infant',
          dose: '1 ml (100,000 iu) to each\nside of the mouth 6 hrly',
          additional: '2 weeks if HIV +ve',
          route: 'PO',
        },
      ]
    }

    return undefined
  }
}

module.exports = Drug
