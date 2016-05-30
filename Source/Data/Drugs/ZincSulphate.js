'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')

const Drug = {
  name: 'Zinc Sulphate',
  types: [
    'other',
  ],
  description: 'Age \u2264 6 mth: 10_mg 24_hrly PO for 14_days\nAge > 6 mth: 20_mg 24_hrly PO for 14_days',
  calculate: (child: Child) => {
    if (!child.age) return undefined

    var dose = (child.age <= 6 ? 10 : 20)

    return {
      dose: `${dose} mg 24 hrly`,
      additional: 'For 14 days',
      route: 'PO',
    }
  }
}

module.exports = Drug
