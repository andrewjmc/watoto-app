'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Carbamazepine',
  types: [
    'anticonvulsant',
    'other',
  ],
  description: 'Age 1 mth - 12 yrs:\nInitially 5_mg/kg PO at night, increased as necessary by 2.5-5_mg/kg every 3-7 days\nUsual maintenance dose 5_mg/kg PO 2-3 times daily',
  warning: 'Avoid abrupt withdrawal and watch carefully for side effects',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 1) return undefined // < 1 mth

    if (child.age < 156) { // < 13 yrs
      var initalDose = 5 * child.weight
      var followDose0 = 2.5 * child.weight
      var followDose1 = 5 * child.weight

      var maintenanceDose = 5 * child.weight

      return [
        {
          heading: 'Initially',
          dose: `${DrugUtil.dp(initalDose,0)} mg at night`,
          additional: `Increased as necessary by\n${DrugUtil.dp(followDose0,0)}-${DrugUtil.dp(followDose1,0)} mg every 3-7 days`,
          route: 'PO',
        },
        {
          heading: 'Maintenance',
          dose: `${DrugUtil.dp(maintenanceDose,0)} mg 2-3 times daily`,
          route: 'PO',
        },
      ]
    }

    return undefined
  }
}

module.exports = Drug
