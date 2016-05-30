'use strict'

const jasmineMatchers = require('jasmine-matchers-loader')

jasmineMatchers.add({
  toBeWithinTolerance: (target, tolerance, actual) => {
    target = parseFloat(target)
    tolerance = parseFloat(tolerance)
    actual = parseFloat(actual)

    return (
      !isNaN(actual) &&
      actual >= target - tolerance &&
      actual <= target + tolerance
    )
  },
  toBeAfterCleaning: (target, regexp, actual) => {
    if (actual === undefined) return (actual === target)
    return (
      actual.replace(regexp, '') === target
    )
  }
})
