'use strict'  

jest.dontMock('../../DrugUtil')
const TestHelpers = require('./Test-helpers')
const TestIterators = require('./Test-iterators')
var {
  Time,
  Child,
  DrugDose,
} = TestHelpers

const Dose = DrugDose.template({
  route: 'PO',
})

const tests = [
  {age:   Time.weeks(2), expected: undefined},
  {age:  Time.months(3), expected: Dose('1 paed tablet (20+160mg)\n24 hrly for 3 days',{additional:'or \u00BD adult tablet (40+320mg)'})},
  {age:   Time.years(1), expected: Dose('1 paed tablet (20+160mg)\n24 hrly for 3 days',{additional:'or \u00BD adult tablet (40+320mg)'})},
  {age:   Time.years(2), expected: Dose('1 paed tablet (20+160mg)\n24 hrly for 3 days',{additional:'or \u00BD adult tablet (40+320mg)'})},
  {age: Time.months(35), expected: Dose('1 paed tablet (20+160mg)\n24 hrly for 3 days',{additional:'or \u00BD adult tablet (40+320mg)'})},
  {age:   Time.years(3), expected: Dose('2 paed tablets (20+160mg)\n24 hrly for 3 days',{additional:'or 1 adult tablet (40+320mg)'})},
  {age: Time.months(48), expected: Dose('2 paed tablets (20+160mg)\n24 hrly for 3 days',{additional:'or 1 adult tablet (40+320mg)'})},
  {age:   Time.years(5), expected: Dose('2 paed tablets (20+160mg)\n24 hrly for 3 days',{additional:'or 1 adult tablet (40+320mg)'})},
  {age: Time.months(71), expected: Dose('2 paed tablets (20+160mg)\n24 hrly for 3 days',{additional:'or 1 adult tablet (40+320mg)'})},
  {age:   Time.years(6), expected: Dose('2 paed tablets (20+160mg)\n24 hrly for 3 days',{additional:'or 1 adult tablet (40+320mg)'})},
  {age:  Time.years(13), expected: undefined},
]

TestIterators.Age.OneExpected('DihydroartemisininPiperaquine', tests)
