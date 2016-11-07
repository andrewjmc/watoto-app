'use strict'

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
  Picker
} from 'react-native'

const _ = require('lodash')
const GLOBAL = require('../Globals')
const Network = require('../Network')
const DrugUtil = require('../Data/DrugUtil')

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingTop: 0,
    flexDirection: 'column'
  },
  section: {
    paddingTop: (8 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (8 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    flex: 1,
    borderColor: '#ccc',
    borderBottomWidth: GLOBAL.PIXEL,
  },
  sectionBorderless: {
    paddingTop: (8 + GLOBAL.SCREEN_PADDING),
    paddingBottom: (8 + GLOBAL.SCREEN_PADDING),
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    flex: 1,
  },
  label: {
    width: 175,
    marginTop: (3 + GLOBAL.SCREEN_PADDING) + (Platform.OS==='ios'?4:2),
    marginLeft: 6,
    marginBottom: (3 + GLOBAL.SCREEN_PADDING),
    flex: 3,
    fontSize: 20,
    textAlign: 'left',
    color: '#000',
   },
  input: {
    height: 38,
    width: 100,
    marginTop: (0 + GLOBAL.SCREEN_PADDING),
    marginRight: 5,
    backgroundColor: 'transparent',
    color: 'black',
  },
  inputAndroid: {
    paddingTop: -1,
    paddingBottom: -1,
    marginRight: ((Platform.OS==='android' && Platform.Version < 21) ? -2 : 4),
  },
  dripRateContainer: {
  	flex: 1,
  },
  dripRateInfo: {
  	flexDirection: 'row'
  },
  dripRateInfoText: {
  	flex: 1,
  },
  dripRateHighlight: {
  	height: 200
  },
  dripRateBoxContainer: {
  	flexDirection: 'column',
  	alignItems: 'center',
  	flex: 1,
  },
  dripRateBoxFloat: {
  	width: 200,
  	height: 200,
  	backgroundColor: 'red'
  },
  dripRateBox: {
  	width: 200,
  	height: 200,
  	flexDirection: 'column',
  	alignItems: 'center'
  },
  dripRateMessage: {
  	width: 200,
  	height: 200,
  },
  drText: {
  	textAlign: 'center',
  	textAlignVertical: 'center',
  	fontSize: 24
  },
  drmSuccess: {
  	backgroundColor: 'green'
  },
  drmFailure: {
  	backgroundColor: 'red'
  }
})

const DripRate = React.createClass({
  componentDidMount() {
    Network.get().visit('dripRate', this.props.name)
  },
  getInitialState() {
    return {
      infusionType: this.props.fluidType == 'blood' ? 'Blood giving set' : 'Adult giving set',
    }
  },
  render() {
  	var iT = {"Adult giving set": {"dripRate": 20, "fluidType": 'fluid'}, "Soluset": {"dripRate": 60, "fluidType": "fluid"}, "Blood giving set": {"dripRate": 15, "fluidType": "blood"}}
  	
  	var _this = this;
  	let infusionTypes = _.pickBy(iT, function(i){
  		return i.fluidType == _this.props.fluidType;
  	});
  	
    return (
      <View style={styles.container}>
      	<View style={[styles.section,{paddingBottom:0}]}>
      		<Text style={styles.label} ref="vol-time-text">{this.props.volume + ' ml over ' + this.props.time + ' hour' + (this.props.time == 1 ? '' : 's')}</Text>
      	</View>
        <View style={[styles.section,{paddingBottom:0}]}>
      	  <Text 
              style={styles.label}>
              Infusion type
          </Text>
          <Picker style={[styles.input,(Platform.OS==='android')?styles.inputAndroid:{}]} selectedValue={this.state.infusionType} onValueChange={this.onValueChange.bind(this,"infusionType")}>
  		    {
	  	       Object.keys(infusionTypes).map(function(iT){
  			     	return <Picker.Item key={iT} label={iT} value={iT} />
	  		   })
             }
		  </Picker>
        </View>
		<CalculatedDripRate infusionDuration={this.props.time} infusionVolume={this.props.volume} infusionRatio={infusionTypes[this.state.infusionType]["dripRate"]} />
      </View>
    )
  },
  
  onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
	this.setState(newState);
  }
})

module.exports = DripRate

class CalculatedDripRate extends Component{
	render(){
		return (
			<View style={styles.dripRateContainer}>
				{(() => {
		    		if (this.props.infusionDuration > 0 && this.props.infusionVolume > 0) {
		      			var rate = this.props.infusionVolume / this.props.infusionDuration
		      			var rateStr = Math.round(rate) + ' ml/h'
		      			var dripRate = rate * this.props.infusionRatio / 60
		      			var dripRateStr = Math.round(dripRate,1) + ' drop' + (Math.round(rate,1) == 1 ? '' : 's') + '/min'
		      			var dripTime = 60 / dripRate
		      			var dripSecondStr, dripSecond
		      			if(dripTime < 1){
		      				dripSecond = Math.round(dripRate / 60)
		      				dripSecondStr = dripSecond + ' drip' + (dripSecond == 1 ? '' : 's') + '/second' 
		      			}
		      			else{
		      				dripSecond = Math.round(dripTime)
		      				dripSecondStr = dripSecond + 's between drips'
		      			} 
		      			var dripsPerSecond
		      			return (
		      				<View>
		      					<View style={styles.dripRateInfo}>
		      						<Text ref="rate-text" style={[styles.label,{flex: 1, textAlign: 'left'}]}>{rateStr}</Text>
		      						<Text ref="drip-rate-text" style={[styles.label,{flex: 1, textAlign: 'center'}]}>{dripRateStr}</Text>
		      						<Text ref="drip-second-text" style={[styles.label,{flex: 1, textAlign: 'right'}]}>{'approx. ' + dripSecondStr}</Text>
		      					</View>
		      					<TestDripRate dripRate={dripRate} />
		      				</View>
		      			)
		    		} else {
		    			return <Text></Text>
		    		}
				})()}
			</View>
		)
	}
}

class TestDripRate extends Component{
	constructor(props) {
    	super(props)
    	this.state = this.defaultState();
  	}
	
	defaultState() {
		return {active: false, timeout: null, started: null, presses: 0, lastPress: null, times: [], complete: false, dripRate: null, readyToRestart: false}	
	}
	
	deactivate(){
		this.setState({active: false, timeout: null, started: null, presses: 0, lastPress: null, times: [], complete: false, dripRate: null, readyToRestart: false})
	}
	
	complete(){
		var times = this.state.times.sort();
		var avTime = (this.state.lastPress - this.state.started) / (this.state.presses - 1) 
		var range = Math.abs(times[0] - times[times.length - 1])
		if (range > avTime / 2){
			this.setState({complete: true, dripRate: null})
		}
		else{
			var dR = 60000 / avTime
			this.setState({complete: true, dripRate: dR})
			if (Math.abs(((1/dR) - (1/this.props.dripRate)) / (1/this.props.dripRate)) < 0.1){
				this.setState({success: true})
			}
			else{
				this.setState({success: false})
				if (dR > this.props.dripRate){
					this.setState({problem: 'fast'});
				}
				else{
					this.setState({problem: 'slow'});	
				}
			}
		}
		setTimeout(() => {this.setState({readyToRestart: true})}, 2000)
	}
	
	_onRestartPress(){
		if(this.state.readyToRestart){
			this.deactivate()
			this.handlePress(true)
		}
	}

	_onPress(){
		this.handlePress(false)
	}
	
	handlePress(restarting){
		if(!this.state.complete | restarting){
			if(!this.state.active | restarting){
				this.setState({started: Date.now()})
			}
			else{
				this.setState({times: this.state.times.concat(Date.now() - this.state.lastPress)})	
			}
			var presses = restarting ? 1 : this.state.presses + 1
			this.setState({active: true, presses: presses, lastPress: Date.now()})
			var _this = this
			clearTimeout(this.state.timeout)
			if(presses < 11){
				this.setState({timeout: setTimeout(() => {this.deactivate()}, 60000*2 / this.props.dripRate )})
			}
			else{
				this.complete()
			}
		}
	}
	
	render(){
		return(
			<View style={styles.dripRateBoxContainer}>
				<View style={styles.dripRateBoxFloat}>
				{(()=>{
					if(!this.state.complete){
						return (<TouchableHighlight style={[styles.dripRateBox, styles.dripRateHighlight]} onPress={this._onPress.bind(this)} underlayColor="gray">
							<View style={[styles.dripRateBox, this.state.active ? {backgroundColor: "orange"} : {backgroundColor: "gray"}]}>
								{this.state.active ? <Text style={styles.drText}>{11-this.state.presses}</Text> : <Text style={styles.drText}>Tap for each drop</Text>}
							</View>
						</TouchableHighlight>)	
					}
					else{
						return (<TouchableHighlight style={[styles.dripRateBox, this.state.success ? styles.drmSuccess : styles.drmFailure]} onPress={this._onRestartPress.bind(this)}>
							<View style={styles.dripRateBox}>
								<Text style={styles.drText}>
									{this.state.dripRate ? Math.round(this.state.dripRate) + "/min" : "Irregular presses"}
								</Text>
								{this.state.success ?  
									<Text style={styles.drText}>Good</Text>
									:
									<Text>
									{this.state.problem == 'fast' ?
										<Text style={styles.drText}>Too fast</Text> 
										:
										<Text style={styles.drText}>Too slow</Text>
									}
								</Text>}
								{this.state.readyToRestart ?
									<Text style={styles.drText}>
										Click to try again
									</Text>
									:
									<Text></Text>
								}
							</View>
						</TouchableHighlight>)
					}
					
				})()}
				</View>
			</View>
		)
	}	
}
