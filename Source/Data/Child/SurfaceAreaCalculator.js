'use strict'

const bsaMostellerSimplified = (h, w) => {
  return (
    Math.sqrt(w * h) / 60
  ).toFixed(2)
}
const bsaCosteff = (h, w) => {
  w = parseFloat(w)
  return (
    (4 * w + 7) / (90 + w)
  ).toFixed(2)
}

module.exports = {
  getSurfaceArea: (height, weight) => {
    if (!weight) return undefined
    if (weight > 40) return undefined // limit range to "sensible" weights
    if (!height) return '~' + bsaCosteff(undefined, weight)
    if (height < 30 || height > 150) return undefined // limit range to "sensible" heights
    return bsaMostellerSimplified(height, weight)
  }
}
