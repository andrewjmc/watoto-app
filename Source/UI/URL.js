'use strict'

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native'

const URL = React.createClass({
  handleClick() {
    var url = this.props.proto + this.props.url
    Linking.openURL(url)
  },
  render() {
    var text = (this.props.text ? this.props.text : this.props.url)
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View>
          {(this.props.image ? <Image style={this.props.image.style} source={{uri: this.props.image.uri}} /> : null)}
          <Text style={this.props.style}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
})

module.exports = URL
