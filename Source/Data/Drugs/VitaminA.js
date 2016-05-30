'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Vitamin A',
  types: [
    'other',
  ],
  description: 'Age < 6 mth: 50,000 u stat PO\nAge 6-12 mth: 100,000 u stat PO\nAge > 12 mth: 200,000 u stat PO\n\n' +
    'Once on admission, but not to be repeated within 1 month. However, for malnutrition with eye disease, repeat on day_2 and day_14',
  calculate: (child: Child) => {
    if (!child.age) return undefined

    var dose
    if (child.age < 6) dose = 50000
    else if (child.age <= 12) dose = 100000
    else dose = 200000

    return {
      dose: `${DrugUtil.dp(dose,0)} u stat`,
      route: 'PO',
    }
  }
}

module.exports = Drug
