'use strict'

// Sources:
// - Kenya MoH BPP - Feb 2016 (4th Edition)

const Child = require('../Child')
const DrugUtil = require('../DrugUtil')

const Drug = {
  name: 'Phenobarbitone',
  types: [
    'emergency',
    'anticonvulsant',
    'other',
  ],
  description: '' +
    'Loading Dose:\n - Neonate: 20 mg/kg stat\n - Otherwise: 15 mg/kg stat\n(IM / PO)\n' +
    '\n' +
    'Maintenance (High Dose - Chronic Therapy):\n - 5 mg/kg 24 hrly\n' +
    'Maintenance (Starting Dose - Fits in Acute Febrile Illness):\n - 2.5 mg/kg 24 hrly\n(IM / PO)',
  calculate: (child: Child) => {
    if (!child.age || !child.weight) return undefined

    const TABLET = 30

    var loadingMg = (child.age < 1 ? 20 : 15)
    var loadingDose = DrugUtil.numberStep(loadingMg * child.weight, {50:0.5})

    var maintDose = DrugUtil.numberStep(2.5 * child.weight, {50:0.25})
    var maintTabs = maintDose / TABLET

    // Bit complex, but rounding to align to ETAT tablet dosing
    // Initially...
    //  < 0.375 = 0 tablets
    //  < 1 = round to nearest 1/4 tablet
    // Then...
    //  Round UP to nearest 1/2 tablet (0.75 => 1; 1.[1-4] => 1.5 etc)
    if (maintTabs < 0.375) maintTabs = 0
    else if (maintTabs < 1) maintTabs = DrugUtil.numberStep(maintTabs, 0.25)
    maintTabs = DrugUtil.numberStep(maintTabs, 0.5, {round:3})

    var maintHighDose = DrugUtil.numberStep(5 * child.weight, {50:0.5})
    var maintHighTabs = DrugUtil.numberStep(maintHighDose / TABLET, 0.5, {round:0})

    return [
      {
        heading: 'Loading Dose',
        dose: `${DrugUtil.dp(loadingDose,1)} mg stat`,
        route: 'IM / PO',
      },
      {
        heading: 'Maintenance',
        dose: `${DrugUtil.dp(maintDose,2)} mg 24 hrly` + (
          maintTabs > 0 ? `\n${DrugUtil.fractions(maintTabs)} (30mg) ${DrugUtil.plural(maintTabs,'tablet')} 24 hrly` : ''
        ),
        additional: 'Starting Dose\nFits in Acute Febrile Illness',
        // route: 'IM / PO',
      },
      {
        dose: `${maintHighDose} mg 24 hrly` + (
          maintHighTabs > 0 ? `\n${DrugUtil.fractions(maintHighTabs)} (30mg) ${DrugUtil.plural(maintHighTabs,'tablet')} 24 hrly` : ''
        ),
        additional: 'High Dose\nChronic Therapy',
        route: 'IM / PO',
      },
    ]
  }
}

module.exports = Drug
