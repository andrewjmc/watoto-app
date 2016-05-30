'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')

const Drug = {
  name: 'Albendazole',
  types: [
    'other',
  ],
  description: 'Age < 2 yrs: 200 mg PO stat\nAge ≥ 2 yrs: 400 mg PO stat',
  calculate: (child: Child) => {
    if (!child.age) return undefined

    if (child.age < 6) return undefined

    var dose
    if (child.age < 24) dose = 200 // < 2 yrs
    else dose = 400

    return {
      dose: `${dose} mg stat`,
      route: 'PO',
    }
  }
}

module.exports = Drug
