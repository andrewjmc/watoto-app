'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Iron (Fe)',
  types: [
    'other',
  ],
  description: 'Iron Deficiency Anaemia:\n- Pre-term Infant: 2-4_mg elemental_Fe/kg 24_hrly\n- Child: 3-6_mg elemental_Fe/kg 24_hrly\n(PO; max 15 mg)\n\n' +
    'Prophylaxis:\n- Pre-term Infant: 2-4_mg elemental_Fe/kg 24_hrly\n- Term Infant: 1-2_mg elemental_Fe/kg 24_hrly\n(PO; max 15 mg)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 12) { // < 1 yr
      var preTermAnaemiaDose0 = Math.min(2 * child.weight, 15)
      var preTermAnaemiaDose1 = Math.min(4 * child.weight, 15)

      // ? Term Anaemia

      var pretermProphylaxisDose0 = Math.min(2 * child.weight, 15)
      var pretermProphylaxisDose1 = Math.min(4 * child.weight, 15)

      var termProphylaxisDose0 = Math.min(1 * child.weight, 15)
      var termProphylaxisDose1 = Math.min(2 * child.weight, 15)

      return [
        {
          heading: 'Iron Deficiency Anaemia',
          dose: (preTermAnaemiaDose0 == preTermAnaemiaDose1 ?
            `Pre-term: ${DrugUtil.dp(preTermAnaemiaDose0,0)} mg 24 hrly` :
            `Pre-term: ${DrugUtil.dp(preTermAnaemiaDose0,0)}-${DrugUtil.dp(preTermAnaemiaDose1,0)} mg 24 hrly`
          ),
          additional: 'Of Elemental Iron',
          route: 'PO',
        },
        {
          heading: 'Prophylaxis',
          dose: (pretermProphylaxisDose0 == pretermProphylaxisDose1 ?
            `Pre-term: ${DrugUtil.dp(pretermProphylaxisDose0,0)} mg 24 hrly` :
            `Pre-term: ${DrugUtil.dp(pretermProphylaxisDose0,0)}-${DrugUtil.dp(pretermProphylaxisDose1,0)} mg 24 hrly`
          ) + '\n' + (termProphylaxisDose0 == termProphylaxisDose1 ?
            `Term: ${DrugUtil.dp(termProphylaxisDose0,0)} mg 24 hrly` :
            `Term: ${DrugUtil.dp(termProphylaxisDose0,0)}-${DrugUtil.dp(termProphylaxisDose1,0)} mg 24 hrly`
          ),
          additional: 'Of Elemental Iron',
          route: 'PO',
        },
      ]
    }

    // >= 1 yr
    var dose0 = 3 * child.weight
    var dose1 = 6 * child.weight

    return {
      heading: 'Iron Deficiency Anaemia',
      dose: `${DrugUtil.dp(dose0,0)}-${DrugUtil.dp(dose1,0)} mg 24 hrly`,
      additional: 'Of Elemental Iron',
      route: 'PO',
    }
  }
}

module.exports = Drug
