# Watoto

An interactive medical calculator implementing Kenyan basic paediatric protocols

Designed for use by trained medical staff; Watoto supports Kenyan clinicians to assess nutritional status, approximate certain anatomical attributes and calculate essential drug dosing for paediatric patients; quickly and easily, whilst helping to reduce the likelihood of human error.

Available for Android devices via the [Google Play Store](https://play.google.com/store/apps/details?id=org.cyberfish.watoto) (iOS having Apple review issues), the source code is published openly on GitHub to allow for contributions and transparency.

Copyright &copy; 2016 Mat Johns et al

[http://watoto.cyberfish.org](http://watoto.cyberfish.org)

## Background

Built on-top of Facebook's fanstastic [React-Native](https://facebook.github.io/react-native/) framework; and has been designed with a common code base for both Android and iOS. NPM is used both as a package manager plus build (setup) and test runner.

The app was developed in Kenya by UK volunteers and local doctors as a project of the [RCPCH](http://rcpch.ac.uk)[^1]&nbsp;[Global Links](http://rcpch.ac.uk/global/programmes/volunteering-programmes/global-links/global-links-programme) programme in partnership with the [KPA](http://kenyapaediatric.org)[^2]; with grateful thanks to [THET](http://thet.org) and [UK Aid](http://dfid.gov.uk).

[^1]: Royal College of Paediatrics and Child Health.
[^2]: Kenya Paediatric Association.

## Setup

You'll need NPM and NodeJS (plus Xcode and/or Android Studio) and few other bits and piece; see React-Native's [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page for more info.

From a fresh repo clone...

### Install dependencies

This will download all the libraries, hence be aware is a bit bandwidth heavy.

```
npm install
```

### Start development server

This spawns a local packager server that is used to allow the development builds of the app to be reloaded, avoid having to repackage the entire app for each change.

```
npm start
```

This only works on locally connected simulators (who's concept of localhost is the same); however you can adjust [AppDelegate.m](https://facebook.github.io/react-native/docs/running-on-device-ios.html) (for iOS) or use [adb reverse](https://facebook.github.io/react-native/docs/running-on-device-android.html) (for Android) to run on locally connected physical devices.

#### Otherwise, ensure AppInfo.js is generated

If you aren't going to run `npm start`, you will need to make sure the auto-generated source and build information file is generated.

```
npm run prestart
```

## Build

### For Android

Via Gradle; change into the android directory and use the `./gradlew` script to run various build, install and other tasks.

```
cd android/

# build for packager
./gradlew assembleDebug

# build APK for Play Store
./gradlew assembleRelease


# If a device is connected
adb devices
./gradlew installDebug
./gradlew installRelease
```

### For iOS

Via Xcode; when building for development (using the packager) make sure the reference to the pre-bundled file (option 2) is commented out. Conversely if building a "release version", make sure it's not.

```
// jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

## Codebase

Is split up into a number of areas...

### Directories

`Source/` is where all of the core application code is held

`Source/Data/` is (non-UX) protocol information

`Source/Data/Child/` is patient related calculators and estimators

`Source/Data/Drugs/` go figure!

`Source/Pages/` are the UX pages/panels

`Source/UI/` are UX helper classes and fonts

### Files

`Source/WatotoApp.js` is the main starting app file (which `index.ios.js` and `index.android.js` simply loads)

`Source/Router.js` defines top-level app navigation

`Source/Globals.js` contains app wide constansts etc

`Source/Network.js` is the periodic 'phone-home' networking system, that allows for (anonymous) tracking of usage and provides a mechansim for messaging users (if needed)

`Source/DeepLink.js` defines the support for `watoto://` app deep-links, allowing other apps to launch Watoto to certain pages (more below)

`Source/Developer.js` contains a secret developer menu for (mainly) clearing persisted state

`Source/Data/DrugRegistry.js` is the list of all the configured drugs and provides the grouping registry system for navigation; drugs will not appear in the app unless added here

`Source/Data/DrugUtil.js` to provide common helpers for numerical and formatting functions (round, round to nearest, round with precision stepping; plus number, fraction and plural formatting etc)

`Source/Data/Child.js` an class modeling a child (and delegates to the calculators and estimators as needed)

`Source/Pages/ChildInfo.js` in effect the 'home page', for inputing and displaying patient information

`Source/Page/DrugDoseInfo.js` the page that displays the drug doses

## Testing

The are **lots** of unit tests, primarily in two core areas (calculations and rendering) plus the networking stack...

`Source/Data/Drugs/__tests__/` unsuprisingly a lot of test patient scenerios have been created for each drug to validate appropriate calculation

`Source/Data/__tests__/DrugUtil-test.js` given this has the potential to affect (pretty much) all drugs, generic testing of the provided functionality

`Source/Data/__tests__/Child-test.js` ensuring that the child class correct converts and calculates user input

`Source/Pages/__tests__/` currently just for `ChildInfo` and `DrugDoseInfo` as these two pages render critical calculated information

`Source/__tests__/Network-test.js` this is the main 'persistantly stateful' area of the app, validates that state is stable (especially on change/upgrade) and the lifecycles are appropriate

### Running tests

`npm test`

Optionally, to generate coverage report and to display individual test results

`npm test -- --verbose --coverage`

Also to check for potential code issues

`npm run lint`

## Releasing

To cut a release version, before building (via Xcode and/or Gradle) to set the appropriate release version build details...

```npm version X.Y.Z```

This will ensure all tests and passing, set the appropriate version numbers in `package.json`, `android/app/gradle.properties` and `ios/Watoto/Info.plist` and version tag (`vX.Y.Z`) the repo.

### Previous releases

Prior to publishing to GitHub, a number of beta and initial releases were cut from a private repo.

- Beta
    - 0.0.2 - `e84a780`
    - 0.0.3 - `58db932`
    - 0.0.5 - `015cfd5`
    - 0.0.6 - `80815f6`
    - 0.0.9 - `2349e10`
    - 1.0.6 - `aa272b8`
- Released
    - 1.0.2 - `fd3d987`
    - 1.0.4 - `db979a6`

## Deep Linking

Another app is also being developed, there was an intension to allow them to 'deep link' between each other to allow for separated development (and release cycles) by could refer to one another.

This app registers a URL protocol handler in the follow format

`watoto://[type]/[what]`

### Pages

The following types and whats are supported

- `home` or `child`
- `settings`
    - `about`
    - `legal`
    - `credits`
- `drug`
    - drug name in [kebab case](https://lodash.com/docs#kebabCase)
    - e.g `iron-fe`, `vitamin-k` and `dextrose-glucose`

### Arguments

You can also pass patient information as URL arguments (which in the cases of the drug pages a minimum of age and weight is required).

- `age`
- `ageScale`
    - `days`
    - `weeks`
    - `months` *default*
    - `years`
- `gender`
    - `male` *default*
    - `female`
- `weight` in kg
- `height` in cm
- `estimateWeight`
    - `true`, `1` or any non-zero length string
    - `underweight`

### Examples

- Just launch the app
	- `watoto://home` 
- Patient page
    - `watoto://child?age=6&ageScale=weeks&estimateWeight=underweight`
- Paracetamol for 1 year, 12,1 kg
    - `watoto://drug/paracetamol?age=1&ageScale=years&weight=12.1`
- Credits page
    - `watoto://settings/credits`
