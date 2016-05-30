'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)
// HELP REQUIRED!!

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Calcium',
  types: [
    'other',
  ],
  description: 'Symptomatic Hypocalcemia\n(Tetany/Convulsions):\nIV bolus of 10% calcium gluconate 0.5_ml/kg (0.11_mmol/kg) (max_20_ml/kg) over 5-10 min, then continuous IV infusion over 24 hrs of 1.0_mmol/kg (max_8.8_mmol)\n\n' +
    'Mild Hypocalcemia:\n50 mg/kg elemental calicum 24_hrly PO in 4_divided doses',
  warning: 'Monitor calcium especially if on\nVitamin_D or long term therapy',
  calculate: (child: Child) => {
    if (!child.weight) return undefined

    // 232 mmol Elemental Ca = 1,000 ml CaGluconate 10%
    const ML2MMOL = (232/1000)

    var severeBolusMl = Math.min(0.5 * child.weight, 20)
    var severeBolusMmol = severeBolusMl * ML2MMOL

    var severeFollowMmol = Math.min(1 * child.weight, 8.8)
    var severeFollowMl = severeFollowMmol / ML2MMOL

    var mildDoseMg = 50 * child.weight

    return [
      {
        heading: 'Symptomatic Hypocalcemia\n(Tetany/Convulsions)',
        dose: `${DrugUtil.dpTiers(severeBolusMl,{0.5:2,10:1})} ml (${DrugUtil.dpTiers(severeBolusMmol,{0.5:2,10:1})} mmol) bolus\nof 10% calcium gluconate\nover 5-10 min`,
        additional: `Then continuous infusion\n${DrugUtil.dpTiers(severeFollowMl,{10:1})} ml (${DrugUtil.dpTiers(severeFollowMmol,{0.5:2,10:1})} mmol) over 24 hr`,
        route: 'IV (Bolus then Infusion)',
      },
      {
        heading: 'Mild Hypocalcemia',
        dose: `${DrugUtil.dp(mildDoseMg,0)} mg 24 hrly\nof elemental calcium\nin 4 divided doses`,
        route: 'PO',
      },
    ]
  }
}

module.exports = Drug
