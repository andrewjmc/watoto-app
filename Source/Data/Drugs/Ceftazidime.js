'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)
//
// BOOLEAN LOGIC PROBLEM;
// (AGE <= 7 || WEIGHT <= 1.2)
// (AGE >  7 || WEIGHT >  1.2)
//
// (AGE <= 7) = A
// (AGE >  7) = NOT(AGE <= 7) = !A
//
// (WEIGHT <= 1.2) = B
// (WEIGHT >  1.2) = NOT(WEIGHT <= 1.2) = !B
//
// (A OR B)
// (!A OR !B) = !(A AND B)
// 
// So 8 hrly dose can only be reached for a child is neither less-than-or-equal 7 and less-than-or-equal 1.2
// Hence the 12 hrly dose will seemingly always apply to all children less-than-or-equal to 7 irrespective of weight
//
// After consulting, assuming (AGE <= 7 || WEIGHT <= 1.2) / (AGE > 7 && WEIGHT > 1.2)
// Hence (A OR B) / !(A OR B)
// Essentially young or light children get the slower dose; only older children (who are not light) get the quicker one

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Ceftazidime',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Newborn or Neonate \u2264 1.2 kg:\n  50 mg/kg 12 hrly\nNeonate > 1.2 kg and over 7 days:\n  50 mg/kg 8 hrly\n1 mth-12 yrs:\n  30-50 mg/kg 8 hrly\n(IM / IV; max 6_g/24_hrs for pseudemonal infections)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 0.25) { // <= 1 week
      var dose = Math.min(50 * child.weight, 2000)

      return {
        dose: `${DrugUtil.dp(dose,0)} mg 12 hrly`,
        route: 'IM / IV',
      }
    }

    if (child.age < 1) { // < 1 mth
      if (child.weight <= 1.2) {
        var dose = Math.min(50 * child.weight, 3000)
        return {
          dose: `${DrugUtil.dp(dose,0)} mg 12 hrly`,
          route: 'IM / IV',
        }
      }
      else {
        var dose = Math.min(50 * child.weight, 2000)
        return {
          dose: `${DrugUtil.dp(dose,0)} mg 8 hrly`,
          route: 'IM / IV',
        }
      }
    }

    // >= 1 mth
    var dose0 = Math.min(30 * child.weight, 2000)
    var dose1 = Math.min(50 * child.weight, 2000)

    return {
      dose: `${DrugUtil.dp(dose0,0)}-${DrugUtil.dp(dose1,0)} mg 8 hrly`,
      route: 'IM / IV',
    }
  }
}

module.exports = Drug
