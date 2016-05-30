'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')

const Drug = {
  name: 'Budesonide',
  types: [
    'other',
  ],
  description: 'pMDI with a spacer 200 micrograms daily (low_dose)',
  calculate: (child: Child) => {
    if (!child.age) return undefined

    if (child.age < 12) return undefined // < 1 year

    return {
      dose: '200 micrograms 24 hrly',
      route: 'Inhaler via Spacer',
    }
  }
}

module.exports = Drug
