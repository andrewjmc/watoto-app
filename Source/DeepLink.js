'use strict'

import {
  Platform,
  Linking,
} from 'react-native'

const _ = require('lodash')
const qs = require('qs')

const GLOBAL = require('./Globals')
const Router = require('./Router')
const Network = require('./Network')
const DrugRegistry = require('./Data/DrugRegistry')

const PROTO = 'watoto://'

class DeepLink {
  static initial(navigator, state, changeState) {
    Linking.getInitialURL().then((url) => {
      DeepLink.handle(url, navigator, state, changeState)
    })

    // On iOS, we also need to pickup URLs even once the app is running
    if (Platform.OS == 'ios') {
      Linking.addEventListener('url', (event) => {
        DeepLink.handle(event.url, navigator, state, changeState)
      })
    }
  }

  static handle(url, navigator, state, changeState) {
    if (_.isString(url) && _.startsWith(url, PROTO)) {
      url = url.replace(PROTO, '').split('?')
      url[0] = url[0].split('/')

      var type = url[0][0]
      var what = url[0][1]
      var params = url[1] ? qs.parse(url[1]) : {}

      if (_.isFunction(changeState)) {
        // Raw typed values
        _.forEach([
          'age',
          'weight',
          'height',
        ], (x) => {
          if (_.isString(params[x])) {
            changeState(`${x}Raw`, params[x].replace(/[^0-9\.]/g, ''))
          }
        })
        // Options
        if (_.isString(params['gender'])) {
          params['gender'] = _.upperFirst(_.lowerCase(params['gender']))
          var gender = _.find(GLOBAL.GENDERS, { label: params['gender'] })
          if (gender) changeState('gender', gender)
        }
        if (_.isString(params['ageScale'])) {
          params['ageScale'] = _.upperFirst(_.lowerCase(params['ageScale']))
          var ageScale = _.find(GLOBAL.AGE_SCALES, { label: params['ageScale'] })
          if (ageScale) changeState('ageScale', ageScale)
        }
        // Toggle switches
        if (_.isString(params['estimateWeight'])) {
          changeState('estimateWeight', (params['estimateWeight'].length > 0))
          changeState('estimateUnderweight', (params['estimateWeight'].toLowerCase() == 'underweight'))
        }
      }

      switch (type) {
        case 'home':
        case 'child':
          // not for Android as it re-launches the app, is redundent and is buggy :(
          switch (Platform.OS) {
            case 'ios':
              DeepLink.jumpToRoute(navigator, Router.ChildInfo(state))
              break
          }
          break
        case 'drug':
          // As we're bypassing the normal router checks
          // Validate we have a valid age and weight
          if (state.child.age && !(state.child.age > 60) 
            && state.child.weight && !(state.child.weight > 30)
          ) {
            var drug = DrugRegistry.getByApi(_.kebabCase(what))
            if (drug) DeepLink.jumpToRoute(navigator, Router.DrugDoseInfo(state, drug.name, drug.shortName))
          }
          break
        case 'settings':
          if (what != undefined) what = what.toLowerCase()
          switch (what) {
            case 'about':
            case 'legal':
            case 'credits':
              break
            default:
              what = undefined
          }
          DeepLink.jumpToRoute(navigator, Router.Settings(state, what))
          break
      }
    }
  }

  static jumpToRoute(navigator, route) {
    var stack = navigator.getCurrentRoutes()
    var current = stack[stack.length -1].scene.props._routeName
    var jumper = route._routeName

    // If the currently displayed page is the same route
    // as the target 'jumper'; then replace
    if (current == jumper) navigator.replace(route)
    else navigator.push(route)

    // We've moved away from the current page
    // Ensure that any page visits are cancelled
    Network.get().back()
  }
}

module.exports = DeepLink
