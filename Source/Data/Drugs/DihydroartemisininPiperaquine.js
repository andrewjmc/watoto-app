'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Dihydroartemisinin Piperaquine',
  shortName: 'DHA Piperaquine',
  types: [
    'other',
  ],
  description: 'Dihydroartemisinin\n  (20 mg paed/40 mg adult tablet)\nPiperaquine\n  (160 mg paed/320 mg adult tablet)\n\n' +
    'Age 3-36 mths: 1 paed tablet\nAge 3-5 yrs: 2 paed tablets\nAge 6-11 yrs: 1 adult tablet',
  calculate: (child: Child) => {
    if (!child.age) return undefined

    if (child.age < 3) return undefined // < 3 mths

    if (child.age < 36) return { // < 3 yrs
      dose: `1 paed tablet (20+160mg)\n24 hrly for 3 days`,
      additional: 'or \u00BD adult tablet (40+320mg)',
      route: 'PO',
    }

    // 3-5 yrs = 2 paed tablets = 180mg * 2 = 360 mg
    // 6-11 yrs = 1 adults tablet = 360 mg
    // hence the same!

    if (child.age < 144) return { // < 12 yrs
      dose: `2 paed tablets (20+160mg)\n24 hrly for 3 days`,
      additional: 'or 1 adult tablet (40+320mg)',
      route: 'PO',
    }

    return undefined
  }
}

module.exports = Drug
