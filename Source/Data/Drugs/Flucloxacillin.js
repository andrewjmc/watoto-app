'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Flucloxacillin',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Newborn:\n - 50 mg/kg 12 hrly IV/IM\n - 25mg/kg 12 hrly PO\n\nOtherwise:\n - 50 mg/kg 8 hrly IV/IM\n - 15mg/kg 8 hrly PO',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    const TABLET = 250
    const MG2ML = (125/5)

    if (child.age < 0.25) { // <= 1 week
      var doseInj = DrugUtil.numberStep(Math.min(50 * child.weight, 2000), 5, {round:0})
      var dosePOMg = DrugUtil.numberStep(Math.min(25 * child.weight, 500), 5)

      var dosePOMl = dosePOMg / MG2ML

      return [
        {
          dose: `${DrugUtil.dp(doseInj,0)} mg 12 hrly`,
          route: 'IV / IM',
        },
        {
          dose: `${DrugUtil.dp(dosePOMg,0)} mg 12 hrly\n${DrugUtil.dp(dosePOMl,0)} ml (125mg/5ml) 12 hrly`,
          route: 'PO',
        },
      ]
    }

    // > 1 week
    var doseInj = DrugUtil.numberStep(Math.min(50 * child.weight, 2000), 5)
    var dosePOMg = DrugUtil.numberStep(Math.min(15 * child.weight, 500), 5)

    var dosePOMl = dosePOMg / MG2ML
    var tabs = dosePOMg / TABLET

    // < 1.5 ml = nearest 0.5
    // < 3 ml   = nearest 2.5
    // < 6.5 ml = nearest 5
    // beyond   = nearest 10
    dosePOMl = DrugUtil.numberStep(dosePOMl, {1.5:0.5,3:2.5,6.5:5}, {otherwise:10})

    // < 0.35 tabs = nearest 1/4
    // < 0.6 tabs  = nearest 1/2
    // beyond      = nearest 1
    tabs = DrugUtil.numberStep(tabs, {0.35:0.25,0.6:0.5}, {otherwise:1})

    var dosePO = {
      dose: `${DrugUtil.dp(dosePOMg,0)} mg 8 hrly` + (
        dosePOMl > 0 ? `\n${DrugUtil.dp(dosePOMl,1)} ml (125mg/5ml) 8 hrly` : ''
      ) + (
        tabs > 0 ? `\n${DrugUtil.fractions(tabs)} (250mg) ${DrugUtil.plural(tabs,'tablet')} 8 hrly` : ''
      ),
      route: 'PO',
    }

    if (dosePOMl > 0 && tabs > 0) {
      dosePO.additional = 'One of the above'
    }

    return [
      {
        dose: `${DrugUtil.dp(doseInj,0)} mg 8 hrly`,
        route: 'IV / IM',
      },
      dosePO,
    ]
  }
}

module.exports = Drug
