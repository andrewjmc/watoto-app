'use strict'

import ExNavigator from '@exponent/react-native-navigator'

import React from 'react'
import ReactNative, {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  BackAndroid,
} from 'react-native'

const Ionicons = require('./UI/Ionicons') // react-native-vector-icons/Ionicons
const Network = require('./Network')

class Router {
  static ChildInfo(state) {
    const ChildInfo = require('./Pages/ChildInfo')
    const RouteName = 'ChildInfo'
    return {
      _routeName: RouteName,
      configureScene() {
        return ExNavigator.SceneConfigs.FloatFromRight
      },
      renderTitle: RouterUX.subTitle.bind(state, 'Watoto', 'Enter patient details'),
      renderLeftButton: RouterUX.settingsButton.bind(state),
      renderRightButton: RouterUX.childInfoNextButton.bind(state),
      renderScene: RouterUX.renderScene.bind({
        page: ChildInfo,
        props: {
          _routeName: RouteName,
          state: state,
        },
      }),
    }
  }

  static Settings(state, tab = null) {
    const Settings = require('./Pages/Settings')
    const RouteName = 'Settings'
    return {
      _routeName: RouteName,
      configureScene() {
        return ExNavigator.SceneConfigs.ZoomFromFront
      },
      renderTitle: RouterUX.soleTitle.bind(state, 'Settings'),
      renderLeftButton: RouterUX.backButton.bind(state),
      renderScene: RouterUX.renderScene.bind({
        page: Settings,
        props: {
          _routeName: RouteName,
          state: state,
          tab: tab,
        }
      }),
    }
  }

  static DrugDoses(state) {
    const DrugDoses = require('./Pages/DrugDoses')
    const RouteName = 'DrugDoses'
    return {
      _routeName: RouteName,
      configureScene() {
        return ExNavigator.SceneConfigs.FloatFromRight
      },
      renderTitle: RouterUX.patientTitle.bind(state, 'Drug Doses'),
      renderLeftButton: RouterUX.backButton.bind(state),
      renderScene: RouterUX.renderScene.bind({
        page: DrugDoses,
        props: {
          _routeName: RouteName,
          state: state,
        },
      }),
    }
  }

  static DrugDosesSection(state, title, type) {
    const DrugDosesSection = require('./Pages/DrugDosesSection')
    const RouteName = 'DrugDosesSection'
    return {
      _routeName: RouteName,
      configureScene() {
        return ExNavigator.SceneConfigs.FloatFromRight
      },
      renderTitle: RouterUX.patientTitle.bind(state, title),
      renderLeftButton: RouterUX.backButton.bind(state),
      renderScene: RouterUX.renderScene.bind({
        page: DrugDosesSection,
        props: {
          _routeName: RouteName,
          state: state,
          type: type,
        },
      }),
    }
  }

  static DrugDoseInfo(state, name, shortName) {
    const DrugDoseInfo = require('./Pages/DrugDoseInfo')
    const RouteName = 'DrugDoseInfo'
    return {
      _routeName: RouteName,
      configureScene() {
        return ExNavigator.SceneConfigs.FloatFromRight
      },
      renderTitle: RouterUX.patientTitle.bind(state, (!shortName ? name : shortName)),
      renderLeftButton: RouterUX.backButton.bind(state),
      renderScene: RouterUX.renderScene.bind({
        page: DrugDoseInfo,
        props: {
          _routeName: RouteName,
          state: state,
          name: name,
        },
      }),
    }
  }
}

const styles = StyleSheet.create({
  barLeftButtonIcon: {
    marginTop: 11,
    marginLeft: 16,
  },
  barRightButtonIcon: {
    marginTop: 12,
    marginRight: 16,
  },
  barRightText: {
    fontSize: 24,
    color: '#4F8EF7',
    marginTop: 6,
    marginRight: 6,
  },
  titleSection: {
    flexDirection: 'column',
    alignItems: (Platform.OS=='ios'?'center':'flex-start'),
    paddingTop: (Platform.OS=='android'?5:0),
  },
  title: {
    fontSize: 18,
    color: '#000',
  },
  soleTitle: {
    fontSize: 18,
    color: '#000',
    marginTop: 10,
  },
  subTitle: {
    paddingTop: 2,
    fontSize: 12,
    color: '#000',
  },
  subTitleGender: {
    fontFamily: 'Arial',
  }
})

// When func is bound from the above routing (using .bind)
// The context 'this' is set by the first argument,
// typically the application state
class RouterUX {
  boundBackButton = false;

  static renderScene(navigator) {
    // If android bind the hardware back button
    if (Platform.OS == 'android' && !RouterUX.boundBackButton) {
      RouterUX.boundBackButton = true
      BackAndroid.addEventListener('hardwareBackPress', () => {
        RouterUX.back(navigator)
        return true
      })
    }
    // must be UPPERCASE Page to JSX render
    var Page = this.page
    return (
      <Page navigator={navigator} {...this.props} />
    )
  }

  static soleTitle(title) {
    return (
      <View>
        <Text style={styles.soleTitle}>{title}</Text>
      </View>
    )
  }

  static subTitle(title, subTitle) {
    return (
      <View style={styles.titleSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    )
  }

  static patientTitle(title) {
    var age = (this.child.age / this.child.ageScale.value).toFixed(1)
    var weight = this.child.weight.toPrecision(3)
      .replace(/(\.[0-9]*[1-9])[0]+$/, '$1') // 0.0101 => 0.01
      .replace(/(\.0)[0]+$/, '$1') // 1.00 => 1.0

    var subTitle = ' '

    if (this.child.age) {
      subTitle += age + ' ' + this.child.ageScale.unit + ' '
    }

    if (this.child.estimateWeight) {
      subTitle += 'estimated '
    }
    subTitle += weight + ' kg'

    return (
      <View style={styles.titleSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>
          <Text style={[(Platform.OS=='ios'?styles.subTitleGender:{})]}>
            {this.child.gender.unit}
          </Text>
          {subTitle}
        </Text>
      </View>
    )
  }

  static childInfoNextButton(navigator) {
    return (
      <TouchableOpacity
        touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
        onPress={() => {
          // *Nasty Hack*
          // The right button touchable seems to be present but "hidden" on other pages
          // (i.e. not ChildInfo) but if you click on this hidden area it actions this!!!
          // Return if not on actually on the ChildInfo/home page (only 1 item in the routes)
          if (navigator.getCurrentRoutes().length > 1) return

          if (!this.child.weight || !this.child.age) {
            Alert.alert(
              'Missing Information',
              'You must provide the patient\'s age and weight before continuing',
              [
                {text: 'Back', style: 'cancel'},
              ]
            )
          }
          else if (this.child.weight > 30) {
            Alert.alert(
              'Unsupported Patient',
              'These protocols are only valid for patients up to 30 kg',
              [
                {text: 'Back', style: 'cancel'},
              ]
            )
          }
          else if (this.child.age < 0 || this.child.age > 60) {
            Alert.alert(
              'Unsupported Patient',
              'These protocols are only valid for patients up to 5 years',
              [
                {text: 'Continue Anyway', style: 'destructive', onPress: () => {
                  navigator.push(Router.DrugDoses(this))
                }},
                {text: 'Back', style: 'cancel'},
              ]
            )
          }
          else {
            navigator.push(Router.DrugDoses(this))
          }
        }}
        style={ExNavigator.Styles.barRightButton}>
        <Text style={styles.barRightText}>
          {'\u211E'}
        </Text>
        <Ionicons style={styles.barRightButtonIcon} name='chevron-right' size={24} color='#4F8EF7' />
      </TouchableOpacity>
    )
  }

  static settingsButton(navigator) {
    return (
      <TouchableOpacity
        touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
        onPress={() => navigator.push(Router.Settings(this))}
        style={ExNavigator.Styles.barLeftButton}>
        <Ionicons style={styles.barLeftButtonIcon} name='gear-a' size={24} color='#4F8EF7' />
      </TouchableOpacity>
    )
  }

  static backButton(navigator) {
    return (
      <TouchableOpacity
        touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
        onPress={() => RouterUX.back(navigator)}
        style={ExNavigator.Styles.barLeftButton}>
        <Ionicons style={styles.barLeftButtonIcon} name='chevron-left' size={24} color='#4F8EF7' />
      </TouchableOpacity>
    )
  }

  static back(navigator) {
    navigator.pop()
    Network.get().back()
  }
}

module.exports = Router
