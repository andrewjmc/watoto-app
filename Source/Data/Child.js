'use strict'

const GLOBAL = require('../Globals')
const WeightEstimator = require('./Child/WeightEstimator')
const WeightHeightCalculator = require('./Child/WeightHeightCalculator')
const SurfaceAreaCalculator = require('./Child/SurfaceAreaCalculator')

class Child {
  constructor() {
    this.age = undefined
    this.ageRaw = undefined
    this.ageScale = GLOBAL.AGE_SCALES[2]
    this.gender = GLOBAL.GENDERS[0]
    this.weight = undefined
    this.weightRaw = undefined
    this.weightBackup = undefined
    this.height = undefined
    this.heightRaw = undefined
    this.estimateWeight = false
    this.estimateUnderweight = false

    this.zScore = undefined
    this.surfaceArea = undefined
  }

  get (prop) {
    return this[prop]
  }

  set (prop, value) {
    // console.warn('child', prop, value)
    this[prop] = value
    switch(prop) {
      case 'ageRaw':
      case 'ageScale':
        this._updateAge()
        break
      case 'weightRaw':
        this._updateWeight()
        break
      case 'heightRaw':
        this._updateHeight()
        break
      case 'estimateWeight':
        this._updateEstimatedWeight()
        break
    }
    this._update()
  }

  _updateAge() {
    var convAge = this.ageScale===undefined?undefined:(this.ageRaw * this.ageScale.value)
    this['age'] = isNaN(convAge)?undefined:parseFloat(convAge.toFixed(3))
  }

  _updateWeight() {
    this['weight'] = isNaN(this.weightRaw)?undefined:parseFloat(parseFloat(this.weightRaw).toFixed(2))
  }

  _updateHeight() {
    this['height'] = isNaN(this.heightRaw)?undefined:parseFloat(parseFloat(this.heightRaw).toFixed(0))
  }

  _updateEstimatedWeight() {
    if (!this.estimateWeight) {
      this['estimateUnderweight'] = false
      this['weightRaw'] = this.weightBackup
    }
    else if (this.weightRaw != undefined) {
      this.weightBackup = this.weightRaw
    }
    this._updateWeight()
  }

  _update() {
    if (!this.estimateWeight) {
      this.zScore = WeightHeightCalculator.getZScore(
        (!this.gender?undefined:this.gender.value), this.age, this.height, this.weight)
      this.surfaceArea = SurfaceAreaCalculator.getSurfaceArea(
        this.height, this.weight)
    }
    else {
      this.weightRaw = WeightEstimator.getEstimate(
        this.age, this.estimateUnderweight)
      this._updateWeight()

      this.zScore = undefined
      this.surfaceArea = undefined
    }
  }
}

module.exports = Child
