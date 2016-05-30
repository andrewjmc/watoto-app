'use strict'

import React from 'react'
import ReactNative, {
  PixelRatio,
  Dimensions,
} from 'react-native'

const {height, width} = Dimensions.get('window')
const aspectRatio = height / width

// Attempt to swish/expand the layout depending on the
// "square-ness" / aspect ratio of the screen
//  - 4/3  ~= 1.33 => 0
//  - 3/2   = 1.5  => 2
//  - 16/9 ~= 1.77 => 4
var screenPadding = (Math.round(Math.pow(aspectRatio, 3) / 2) -1) * 2
screenPadding = Math.min(screenPadding, 4) // cap <= 4
screenPadding = Math.max(screenPadding, 0) // cap >= 0

const pixelScale = PixelRatio.get()

module.exports = {
  AGE_SCALES: [
    {
      label: 'Days',
      unit: 'days',
      value: 0.033,
    }, {
      label: 'Weeks',
      unit: 'wks',
      value: 0.23,
    }, {
      label: 'Months',
      unit: 'mths',
      value: 1,
    }, {
      label: 'Years',
      unit: 'yrs',
      value: 12,
    },
  ],
  GENDERS: [
    {
      label: 'Male',
      unit: '\u2642',
      value: 'male',
    }, {
      label: 'Female',
      unit: '\u2640',
      value: 'female',
    },
  ],
  PIXEL: 1 / pixelScale,
  PIXEL_SCALE: pixelScale,
  SCREEN_RATIO: aspectRatio,
  SCREEN_PADDING: screenPadding,
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  DISCLAIMER_TEXT:
    'This app has been developed for use by trained medical staff and reflects specific processes and procedures.' +
    '\n\n' +
    'Use of the app is at your own risk and we make no representations or guarantees as to the completeness or adequacy of any of the information contained within.' +
    '\n\n' +
    'This app is a support tool, provided for reference only. It does not take into account the individual circumstances of a patient; and may not contain all the information you may require. It is therefore not to be used as the sole basis for prescribing or care of any patient; and must be used in conjunction with appropriate professional judgement, hospital policies and procedures.' +
    '\n\n' +
    'We shall not be liable for any claims or losses arising from the use or misuse of this app, its content, any omissions from its content, or otherwise.',
}
