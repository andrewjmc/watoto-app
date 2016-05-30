'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Cefotaxime',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Pre-term Newborn: 50_mg/kg 12_hrly IV\nTerm Newborn: 50_mg/kg 8_hrly IV',
  additional: 'Preferred to Ceftriaxone for treatment of neonatal meningitis in newborns',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 0.25) { // <= 1 week
      var dose = 50 * child.weight

      return [
        {
          heading: 'Pre-term Newborn',
          dose: `${DrugUtil.dp(dose,0)} mg 12 hrly`,
          route: 'IV',
        },
        {
          heading: 'Term Newborn',
          dose: `${DrugUtil.dp(dose,0)} mg 8 hrly`,
          route: 'IV',
        },
      ]
    }

    return undefined
  }
}

module.exports = Drug
