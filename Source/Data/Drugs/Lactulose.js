'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Lactulose',
  types: [
    'other',
  ],
  description: 'Hepatic Encephalopathy:\n' +
    'Infants: 1.7-6.7_grams (2.5-10_ml) 24_hrly PO\n' +
    'Children: 25-60_grams (40-90_ml) 24_hrly PO\n' +
    'Adjust dosage to produce 2-3_soft_stools per_day\n' +
    '\n' +
    'Chronic Constipation:\n' +
    'Children: 0.7-2_grams/kg (1-3_ml/kg) 24_hrly\n(PO; max 40 g/60 ml)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 12) { // < 1 yr
      return [
        {
          heading: 'Hepatic Encephalopathy',
          dose: '1.7-6.7 g (2.5-10 ml) 24 hrly\ndivided in 3-4 doses',
          additional: 'Adjust dosage to produce\n2-3 soft stools per day',
          route: 'PO',
        },
      ]
    }

    // >= 1 yr
    var constipDoseG0 = Math.min(0.7 * child.weight, 40)
    var constipDoseG1 = Math.min(2 * child.weight, 40)

    var constipDoseMl0 = Math.min(1 * child.weight, 60)
    var constipDoseMl1 = Math.min(3 * child.weight, 60)

    return [
      {
        heading: 'Hepatic Encephalopathy',
        dose: '25-60 g (40-90 ml) 24 hrly\ndivided in 3-4 doses',
        additional: 'Adjust dosage to produce\n2-3 soft stools per day',
        route: 'PO',
      },
      {
        heading: 'Chronic Constipation',
        dose: `${DrugUtil.dp(constipDoseG0,0)}-${DrugUtil.dp(constipDoseG1,0)} g (${DrugUtil.dp(constipDoseMl0,0)}-${DrugUtil.dp(constipDoseMl1,0)} ml) 24 hrly\nin divided doses`,
        additional: 'max 40 g (60 ml)',
        route: 'PO',
      },
    ]
  }
}

module.exports = Drug
