'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const _ = require('lodash')
const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Co-trimoxazole',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Trimethoprim 4_mg/kg\n& Sulphamethoxazole 20_mg/kg PO\n\nPCP Prophylaxis: 24 hrly\nPCP Treatment: 8 hrly for 3 weeks\nNon-PCP: 12 hrly',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    // PCP
    var pcpDose
    switch (true) {
      case (child.weight < 1):
        break
      case (child.weight < 5):
        pcpDose = [
          '2.5 ml (240mg/5ml)',
          '1 (120mg) tablet',
          '\u00BC (480mg) tablet',
        ]
        break
      case (child.weight < 9):
        pcpDose = [
          '5 ml (240mg/5ml)',
          '2 (120mg) tablets',
          '\u00BD (480mg) tablet',
        ]
        break
      case (child.weight < 17):
        pcpDose = [
          '10 ml (240mg/5ml)',
          '1 (480mg) tablet',
        ]
        break
      case (child.weight < 51):
        pcpDose = [
          '2 (480mg) tablets',
        ]
        break
    }

    // Non-PCP
    var nonPcpDose
    switch (true) {
      case (child.weight < 2):
        break
      case (child.weight < 4):
        nonPcpDose = [
          '2.5 ml (240mg/5ml)',
          '1 (120mg) tablet',
          '\u00BC (480mg) tablet',
        ]
        break
      case (child.weight < 11):
        nonPcpDose = [
          '5 ml (240mg/5ml)',
          '2 (120mg) tablets',
          '\u00BD (480mg) tablet',
        ]
        break
      case (child.weight < 16):
        nonPcpDose = [
          '7.5 ml (240mg/5ml)',
          '2 (120mg) tablets',
          '\u00BD (480mg) tablet',
        ]
        break
      case (child.weight < 21):
        nonPcpDose = [
          '10 ml (240mg/5ml)',
          '1 (480mg) tablet',
        ]
        break
    }

    var ret = []
    var freq, dose

    if (pcpDose) {
      if (child.age > 1) {
        freq = ' 24 hrly'
        dose = {
          heading: 'PCP Prophylaxis',
          dose: _.join(pcpDose, `${freq}\n`) + freq,
          route: 'PO',
        }
        if (pcpDose.length > 1) dose.additional = 'One of the above'
        ret.push(dose)
      }
      freq = ' 8 hrly'
      dose = {
        heading: 'PCP Treatment',
        dose: _.join(pcpDose, `${freq}\n`) + freq,
        additional: 'For 3 weeks',
        route: 'PO',
      }
      if (pcpDose.length > 1) dose.additional = 'One of the above\nFor 3 weeks'
      ret.push(dose)
    }

    if (nonPcpDose) {
      freq = ' 12 hrly'
      dose = {
        heading: 'Non-PCP',
        dose: _.join(nonPcpDose, `${freq}\n`) + freq,
        route: 'PO',
      }
      if (nonPcpDose.length > 1) dose.additional = 'One of the above'
      ret.push(dose)
    }

    if (ret.length > 0) return ret
    else return undefined
  }
}

module.exports = Drug
