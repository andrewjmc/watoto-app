'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Dextrose (Glucose)',
  types: [
    'emergency',
    'other',
  ],
  description: 'Neonate: 2 ml/kg\nOtherwise: 5 ml/kg\n10% dextrose IV over 3-5 min',
  additional: 'To make 10% dextrose/glucose\n\n' +
    '- From 50% glucose and water for injection\n' +
      ' \t- 10 ml syringe\n \t\t- 2 ml 50% glucose\n \t\t- 8 ml water\n' +
      ' \t- 20 ml syringe\n \t\t- 4 ml 50% glucose\n \t\t- 16 ml water\n' +
    '- From 50% glucose and 5% glucose\n' +
      ' \t- 10 ml syringe\n \t\t- 1 ml 50% glucose\n \t\t- 9 ml 5% glucose\n' +
      ' \t- 20 ml syringe\n \t\t- 2 ml 50% glucose\n \t\t- 18 ml 5% glucose',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    var dose
    if (child.age < 1) dose = 2 * child.weight // < 1 mth
    else dose = 5 * child.weight

    return {
      dose: `${DrugUtil.dpTiers(dose,{10:1})} ml of 10% dextrose`,
      route: 'IV (over 3-5 min)',
    }
  }
}

module.exports = Drug
