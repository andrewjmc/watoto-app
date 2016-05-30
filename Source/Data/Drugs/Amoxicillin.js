'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)
// TODO; consider review, but ETAT table too complex to round around

const _ = require('lodash')

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const mildTable = {
   3: [ '4 ml (125mg/5ml) 12 hrly'],
   4: [ '4 ml (125mg/5ml) 12 hrly'],
   5: [ '6 ml (125mg/5ml) 12 hrly'],
   6: [ '6 ml (125mg/5ml) 12 hrly'],
   7: [ '8 ml (125mg/5ml) 12 hrly'],
   8: [ '8 ml (125mg/5ml) 12 hrly'],
   9: [ '8 ml (125mg/5ml) 12 hrly'],
  10: ['12 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  11: ['12 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  12: ['12 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  13: ['12 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  14: ['12 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  15: ['15 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  16: ['15 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  17: ['15 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  18: ['15 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  19: ['15 ml (125mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  20: ['15 ml (125mg/5ml) 12 hrly', '2 (250mg) tablets 12 hrly'],
}

const severeTable = {
   3: [ '5 ml (125mg/5ml) 12 hrly', '2.5 ml (250mg/5ml) 12 hrly', '\u00BD (250mg) tablet 12 hrly'],
   4: [ '7.5 ml (125mg/5ml) 12 hrly', '3.75 ml (250mg/5ml) 12 hrly', '\u00BD (250mg) tablet 12 hrly'],
   5: [ '10 ml (125mg/5ml) 12 hrly', '5 ml (250mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
   6: [ '10 ml (125mg/5ml) 12 hrly', '5 ml (250mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
   7: [ '7.5 ml (250mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
   8: [ '7.5 ml (250mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
   9: [ '7.5 ml (250mg/5ml) 12 hrly', '1 (250mg) tablet 12 hrly'],
  10: ['10 ml (250mg/5ml) 12 hrly', '2 (250mg) tablets 12 hrly'],
  11: ['10 ml (250mg/5ml) 12 hrly', '2 (250mg) tablets 12 hrly'],
  12: ['10 ml (250mg/5ml) 12 hrly', '2 (250mg) tablets 12 hrly'],
  13: ['12.5 ml (250mg/5ml) 12 hrly', '2 (250mg) tablets 12 hrly'],
  14: ['12.5 ml (250mg/5ml) 12 hrly', '3 (250mg) tablets 12 hrly'],
  15: ['12.5 ml (250mg/5ml) 12 hrly', '3 (250mg) tablets 12 hrly'],
  16: ['3 (250mg) tablets 12 hrly'],
  17: ['3 (250mg) tablets 12 hrly'],
  18: ['3 (250mg) tablets 12 hrly'],
  19: ['3 (250mg) tablets 12 hrly'],
}

const Drug = {
  name: 'Amoxicillin',
  types: [
    'antibiotic',
    'other',
  ],
  description: 'Newborn or Mild Infections:\n  25 mg/kg 12 hrly PO\nPneumonia & Severe Infections:\n  40-45 mg/kg 12 hrly PO',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    if (child.age < 0.25) { // <= 1 week
      const MG2ML = (125/5)

      var doseMg = 25 * child.weight
      var doseMl = doseMg / MG2ML

      return {
        dose: `${DrugUtil.dp(doseMg,0)} mg 12 hrly\n${DrugUtil.dp(doseMl,0)} ml (125mg/5ml) 12 hrly`,
        route: 'PO',
      }
    }

    // > 1 week
    var weightFloor = Math.floor(child.weight)
    var ret = []

    var mildRet = _.clone(mildTable[weightFloor])
    if (mildRet && mildRet.length > 0) {
      var mildDoseMg = Math.min(25 * child.weight, 500)
      mildRet.unshift(`${DrugUtil.dp(mildDoseMg,0)} mg 12 hrly`)

      var mildDose = {
        heading: 'Mild Infections',
        dose: _.join(mildRet, '\n'),
        route: 'PO',
      }
      if (mildRet.length > 2) {
        mildDose.additional = 'One of the above'
      }
      ret.push(mildDose)
    }

    var severeRet = _.clone(severeTable[weightFloor])
    if (severeRet && severeRet.length > 0) {
      var severeDoseMg0 = Math.min(40 * child.weight, 750)
      var severeDoseMg1 = Math.min(45 * child.weight, 750)

      if (severeDoseMg0 == severeDoseMg1) {
        severeRet.unshift(`${DrugUtil.dp(severeDoseMg0,0)} mg 12 hrly`)
      }
      else {
        severeRet.unshift(`${DrugUtil.dp(severeDoseMg0,0)}-${DrugUtil.dp(severeDoseMg1,0)} mg 12 hrly`)
      }

      var severeDose = {
        heading: 'Pneumonia & Severe Infections',
        dose: _.join(severeRet, '\n'),
        route: 'PO',
      }
      if (severeRet.length > 2) {
        severeDose.additional = 'One of the above'
      }
      ret.push(severeDose)
    }

    if (ret.length > 0) return ret
    return undefined
  } 
}

module.exports = Drug
