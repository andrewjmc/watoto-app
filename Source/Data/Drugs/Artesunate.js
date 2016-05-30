'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Artesunate',
  types: [
    'other',
  ],
  description: 'Weight \u2264 20 kg: 3 mg/kg\nWeight > 20 kg: 2.4 mg/kg\n\nOf injectable artesunate (IV/IM) at 0,_12_&_24_hrs and continue 24_hrly (max_7_days) until oral administration is feasible\n\n' +
    'As soon as the child can drink then change to a full course of artemisinin combination therapy (ACT) typically the 1st line oral anti-malarial, Artemether_Lumefantrine',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    const MG2IV = (60/6)
    const MG2IM = (60/3)

    var dose
    if (child.weight <= 20) {
      dose = 3 * child.weight
    }
    else {
      dose = 2.4 * child.weight
    }

    var doseIV = DrugUtil.numberStep(dose / MG2IV, 0.1)
    var doseIM = DrugUtil.numberStep(dose / MG2IM, {0.75:0.05}, {otherwise:0.1})

    return {
      dose: `${DrugUtil.dp(dose,0)} mg at 0, 12 & 24 hrs`,
      additional: `${DrugUtil.dp(doseIV,1)} ml (60mg/6ml) IV\n${DrugUtil.dp(doseIM,2)} ml (60mg/3ml) IM\nContinue 24 hrly until PO is feasible`,
      route: 'IV / IM',
    }
  }
}

module.exports = Drug
