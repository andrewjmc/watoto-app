'use strict'

import {
  Platform,
  Alert,
  AsyncStorage,
  Linking,
} from 'react-native'

const _ = require('lodash')
const Moment = require('moment')
const DeviceInfo = require('react-native-device-info')
const APPINFO = require('./AppInfo')
const GLOBAL = require('./Globals')

const PING_URL = 'https://watoto.cyberfish.org/app/ping'
const PING_FREQUENCY = [1, 'days']
const PING_RETRY_FREQUENCY = [1, 'hours']
const PING_CHECK_FREQUENCY = [30, 'minutes']
const PING_MIN_VISIT = [5, 'seconds']
// const PING_URL = 'http://127.0.0.1/watoto/ping/'
// const PING_FREQUENCY = [30, 'seconds']
// const PING_RETRY_FREQUENCY = [10, 'seconds']
// const PING_CHECK_FREQUENCY = [5, 'seconds']

const DAY_DATE_FORMAT = 'YYYY-MM-DD'
const APPINFO_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss ZZ'
const ISO_DATE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss[Z]'
const EPOCH = Moment(0)

const MAX_DAYS = 14

var SINGLETON

class Network {
  static get() {
    if (SINGLETON === undefined) {
      SINGLETON = new Network()
    }
    return SINGLETON
  }

  constructor(
    url = PING_URL,
    {
      pingFreq = PING_FREQUENCY,
      retryFreq = PING_RETRY_FREQUENCY,
      checkFreq = PING_CHECK_FREQUENCY,
      minVisit = PING_MIN_VISIT,
    }={}
  ) {
    this.running = false
    this.url = url
    this.pingFreq = pingFreq
    this.retryFreq = retryFreq
    this.checkFreq = checkFreq
    this.minVisit = minVisit

    this.asKey = 'network.state'
    this.visitTimeout = undefined
    this.pingTimeout = undefined

    this.state = {
      version: 1,
      lastAttempt: 0,
      lastPing: 0,
      lastMessage: 0,
      visited: {},
      latestApp: undefined,
    }
  }

  async start() {
    if (this.running) return
    this.running = true
    AsyncStorage.getItem(this.asKey, (error, value) => {
      if (!error && value) {
        try {
          _.merge(this.state, JSON.parse(value))
        }
        catch (ex) {
          console.warn('Corrupt persisted network state; deleting')
          AsyncStorage.removeItem(this.asKey)
        }
      }
      this.pingCheck()
    })
  }

  stop() {
    if (this.pingTimeout) clearTimeout(this.pingTimeout)
    this.running = false
  }

  visit(type, what) {
    this.visitTimeout = setTimeout(
      this.visited.bind(this, type, what),
      Moment.duration(...this.minVisit).asMilliseconds()
    )
  }

  back() {
    if (this.visitTimeout) clearTimeout(this.visitTimeout)
  }

  visited(type, what) {
    this.visitTimeout = undefined
    var today = Moment().utc().format(DAY_DATE_FORMAT)

    if (!this.state.visited[today]) {
      // To avoid an unbounded storage issue
      // If there are (soon to be) > 14 individual days stored (not necessarily consecutive)
      // Roll them all up (summing the counts) into an overflow entry
      if (_.keys(this.state.visited).length == MAX_DAYS) {
        var overflow = _.reduce(this.state.visited, (res1, types, day) => {
          _.each(types, (whats, type) => {
            res1[type] = _.reduce(whats, (res2, num, what) => {
              res2[what] = res2[what] || 0
              res2[what] += num
              return res2
            }, res1[type] || {})
          })
          return res1
        }, {})
        this.state.visited = {
          overflow: overflow,
        }
      }

      this.state.visited[today] = {}
    }
    this.state.visited[today][type] = this.state.visited[today][type] || {}

    what = _.kebabCase(what)
    var previous = this.state.visited[today][type][what]
    var count = (previous ? previous : 0) +1

    this.state.visited[today][type][what] = count

    this.save()
  }

  save(entries = []) {
    _.forEach(entries, (value, key) => {
      this.state[key] = value
    })
    AsyncStorage.setItem(this.asKey, JSON.stringify(this.state))
  }

  async pingCheck() {
    if (this.state.lastPing == undefined) {
      this.ping()
    }
    else {
      var lastAttempt = Moment(this.state.lastAttempt)
      var lastPing = Moment(this.state.lastPing)

      if (Moment().subtract(...this.pingFreq).isAfter(lastPing)
        && Moment().subtract(...this.retryFreq).isAfter(lastAttempt)
      ) {
        this.ping()
      }
      else {
        this.schedulePingCheck()
      }
    }
  }

  schedulePingCheck() {
    var delay = Moment.duration(...this.checkFreq).asMilliseconds()
    this.pingTimeout = setTimeout(this.pingCheck.bind(this), delay)
  }

  async ping() {
    var message = {
      time: {
        sent: Moment().utc().format(ISO_DATE_FORMAT),
        lastPing: Moment(this.state.lastPing).utc().format(ISO_DATE_FORMAT),
        lastMessage: Moment(this.state.lastMessage).utc().format(ISO_DATE_FORMAT),
      },
      app: {
        version: APPINFO.buildVersion,
        source: APPINFO.sourceVersion,
        time: Moment(APPINFO.buildTime, APPINFO_DATE_FORMAT).utc().format(ISO_DATE_FORMAT),
      },
      device: {
        id: DeviceInfo.getUniqueID(),
        manufacturer: DeviceInfo.getManufacturer(),
        model: DeviceInfo.getDeviceId(),
        country: DeviceInfo.getDeviceCountry(),
        screen: {
          width: Math.floor(GLOBAL.SCREEN_WIDTH),
          height: Math.floor(GLOBAL.SCREEN_HEIGHT),
          scale: Math.round(GLOBAL.PIXEL_SCALE * 100) / 100,
        },
        platform: {
          os: Platform.OS,
          version: DeviceInfo.getSystemVersion(),
        },
      },
      visited: this.state.visited,
    }

    // console.log('Ping Request', JSON.stringify(message, null, 2))

    try {
      // lastAttempt can be lossy
      this.state.lastAttempt = Moment().valueOf()

      var resp = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Connection': 'close',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Watoto-Type': 'PING',
          'Watoto-Version': '1',
        },
        body: JSON.stringify(message),
      })

      // console.log('Ping', resp)

      if (resp.status == 200 && resp.headers.get('Content-Type') == 'application/json') {
        var type = resp.headers.get('Watoto-Type')
        var latestApp = resp.headers.get('Watoto-Latest-App')
        switch (type) {
          case 'PONG':
            var message = await resp.json()
            this.save({
              lastPing: Moment().valueOf(),
              visited: {},
              latestApp: latestApp,
            })
            break
          case 'PONG-RESET':
            var message = await resp.json()
            this.save(message.state)
            break
          case 'PONG-MESSAGE':
            var message = await resp.json()
            this.save({
              lastPing: Moment().valueOf(),
              lastMessage: Moment(message.time).valueOf(),
              visited: {},
              latestApp: latestApp,
            })
            this.onMessage(message)
            break
        }
      }
    }
    catch (e) {
      console.log(e)
    }
    finally {
      this.schedulePingCheck()
    }
  }

  onMessage(message) {
    var buttons = []
    if (message.update) buttons.push({
      text: 'Get Update',
      style: 'default',
      onPress: this.update,
    })
    buttons.push({
      text: 'Close',
      style: 'cancel',
    })

    Alert.alert(
      message.title,
      message.message,
      buttons,
    )
  }

  update() {
    var url = 'https://watoto.cyberfish.org/install/'
    switch (Platform.OS) {
      case 'ios':
        url = 'https://itunes.apple.com/app/id1114369542'
        break
      case 'android':
        url = 'https://play.google.com/store/apps/details?id=org.cyberfish.watoto'
        break
    }
    Linking.openURL(url)
  }
}

module.exports = Network
