'use strict'

const _ = require('lodash')

const drugs = [
  require('./Drugs/Adrenaline'),
  require('./Drugs/Albendazole'),
  require('./Drugs/Amikacin'),
  require('./Drugs/Aminophylline'),
  require('./Drugs/Amoxicillin'),
  require('./Drugs/Ampicillin'),
  require('./Drugs/ArtemetherLumefantrine'),
  require('./Drugs/Artesunate'),
  require('./Drugs/Azithromycin'),
  require('./Drugs/BolusFluid'),
  require('./Drugs/Budesonide'),
  require('./Drugs/BenzylPenicillin'),
  require('./Drugs/CaffeineCitrate'),
  require('./Drugs/Calcium'),
  require('./Drugs/Carbamazepine'),
  require('./Drugs/Cefotaxime'),
  require('./Drugs/Ceftazidime'),
  require('./Drugs/Ceftriaxone'),
  require('./Drugs/Ciprofloxacin'),
  require('./Drugs/Cotrimoxazole'),
  require('./Drugs/Dexamethasone'),
  require('./Drugs/Dextrose'),
  require('./Drugs/Diazepam'),
  require('./Drugs/Digoxin'),
  require('./Drugs/DihydroartemisininPiperaquine'),
  require('./Drugs/Dihydrocodeine'),
  require('./Drugs/Erythromycin'),
  require('./Drugs/Flucloxacillin'),
  require('./Drugs/Gentamicin'),
  require('./Drugs/Hydroxyurea'),
  require('./Drugs/Ibuprofen'),
  require('./Drugs/Iron'),
  require('./Drugs/Lactulose'),
  require('./Drugs/Lorazepam'),
  require('./Drugs/MaintenanceFluid'),
  require('./Drugs/Metronidazole'),
  require('./Drugs/Morphine'),
  require('./Drugs/Nystatin'),
  require('./Drugs/Paracetamol'),
  require('./Drugs/Pethidine'),
  require('./Drugs/Phenobarbitone'),
  require('./Drugs/Phenytoin'),
  require('./Drugs/Potassium'),
  require('./Drugs/Prednisolone'),
  require('./Drugs/Quinine'),
  require('./Drugs/Salbutamol'),
  require('./Drugs/SodiumValproate'),
  require('./Drugs/VitaminA'),
  require('./Drugs/VitaminD'),
  require('./Drugs/VitaminK'),
  require('./Drugs/ZincSulphate'),

  // require('./Drugs/'),
]

const registry = {
  drugs: {},
  types: {},
  api: {},
}

_.forEach(drugs, (drug) => {
  registry.drugs[drug.name] = drug
  registry.api[_.kebabCase(drug.name)] = drug.name
  _.forEach(drug.types, (type) => {
    registry.types[type] = registry.types[type] || []
    registry.types[type].push(drug.name)
  })
})

module.exports = {
  get: (name) => {
    return registry.drugs[name]
  },
  getByApi: (name) => {
    name = registry.api[name]
    return registry.drugs[name]
  },
  getForType: (type) => {
    var ret = []
    var types = registry.types[type]
    if (types) {
      _.forEach(types.sort(), (x) => {
        ret.push(registry.drugs[x])
      })
    }
    return ret
  },
}
