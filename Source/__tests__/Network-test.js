'use strict'  

require('jasmine-expect')
require('./Test-matchers')

const React = require('react-native')
const {
  AsyncStorage,
  Alert,
} = React

const _ = require('lodash')
const fetch = require('fetch-mock')

jest.dontMock('moment')
const Moment = require('moment')

jest.dontMock('../Network')
const Network = require('../Network')

const DeviceInfo = require('react-native-device-info')

const DAY_DATE_FORMAT = 'YYYY-MM-DD'
const ISO_DATE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss[Z]'
const EPOCH = Moment(0)

describe('Network', () => {
  var client, server
  const mockDevice = {
    id: '1234-5678',
    manufacturer: 'Apple',
    model: 'iPhone0,0',
    country: 'GB',
    platformVersion: '0.0',
  }

  beforeEach(() => {
    server = undefined
    client = undefined
    AsyncStorage.clear()
    Alert.alert = jest.fn(_.noop)
    DeviceInfo.getUniqueID = jest.fn(() => mockDevice.id)
    DeviceInfo.getManufacturer = jest.fn(() => mockDevice.manufacturer)
    DeviceInfo.getDeviceId = jest.fn(() => mockDevice.model)
    DeviceInfo.getDeviceCountry = jest.fn(() => mockDevice.country)
    DeviceInfo.getSystemVersion = jest.fn(() => mockDevice.platformVersion)
  })

  afterEach(() => {
    if (server) server.restore()
    if (client) client.stop()
  })

  pit('should ping (check) on instantiation', async () => {
    var mockPingCheck = jest.fn(_.noop)

    client = new Network('http://localhost/watoto/ping')
    client.pingCheck = mockPingCheck
    await client.start()

    expect(mockPingCheck)
      .toBeCalled()
  })

  pit('should send info on ping', async () => {
    var mockSchedulePingCheck = jest.fn(_.noop)
    var mockState = {
      version: 1,
      lastAttempt: Moment().subtract(5, 'days').valueOf(),
      lastPing: Moment().subtract(4, 'days').valueOf(),
      lastMessage: Moment().subtract(3, 'days').valueOf(),
      visited: {
        drug: {
          test: 1,
        },
      },
      latestApp: undefined,
    }

    var now = Moment()
    server = fetch.mock('http://localhost/watoto/ping', 'post', {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Watoto-Type': 'PONG',
      },
      body: {
        time: now.utc().format(ISO_DATE_FORMAT),
      },
    })
    client = new Network('http://localhost/watoto/ping')
    client.schedulePingCheck = mockSchedulePingCheck
    _.merge(client.state, mockState)
    await client.ping()

    expect(server.called())
      .toBeTrue()
    expect(server.lastOptions().headers['Watoto-Type'])
      .toBe('PING')
    expect(server.lastOptions().headers['Watoto-Version'])
      .toBe('1')

    expect(client.state.lastAttempt)
      .toBeGreaterThan(mockState.lastAttempt)
    expect(client.state.lastPing)
      .toBeGreaterThan(mockState.lastPing)
    expect(client.state.lastMessage)
      .toBe(mockState.lastMessage)

    var respBody = JSON.parse(server.lastOptions().body)
    // times
    expect(Moment(respBody.time.lastPing).valueOf())
      .toBeWithinTolerance(mockState.lastPing, 1000)
    expect(Moment(respBody.time.lastMessage).valueOf())
      .toBeWithinTolerance(mockState.lastMessage, 1000)
    // some device details
    expect(respBody.device.id)
      .toBe(mockDevice.id)
    expect(respBody.device.manufacturer)
      .toBe(mockDevice.manufacturer)
    expect(respBody.device.model)
      .toBe(mockDevice.model)
    expect(respBody.device.country)
      .toBe(mockDevice.country)
    expect(respBody.device.platform.version)
      .toBe(mockDevice.platformVersion)
    // visits
    expect(respBody.visited)
      .toEqual(mockState.visited)

    expect(mockSchedulePingCheck)
      .toBeCalled()
  })

  pit('should not set lastPing on ping 500 error', async () => {
    var mockSchedulePingCheck = jest.fn(_.noop)

    server = fetch.mock('http://localhost/watoto/ping', 'post', {
      status: 500
    })
    client = new Network('http://localhost/watoto/ping')
    client.schedulePingCheck = mockSchedulePingCheck
    await client.ping()

    expect(server.called())
      .toBeTrue()

    expect(Moment(client.state.lastAttempt).toDate())
      .toBeAfter(EPOCH.toDate())
    expect(Moment(client.state.lastPing).toDate())
      .toEqual(EPOCH.toDate())
    expect(Moment(client.state.lastMessage).toDate())
      .toEqual(EPOCH.toDate())

    expect(mockSchedulePingCheck)
      .toBeCalled()
  })

  pit('should not set lastPing on ping exception error', async () => {
    var mockSchedulePingCheck = jest.fn(_.noop)

    server = fetch.mock('http://localhost/watoto/ping', 'post', {
      throws: 'exception',
    })
    client = new Network('http://localhost/watoto/ping')
    client.schedulePingCheck = mockSchedulePingCheck
    await client.ping()

    expect(server.called())
      .toBeTrue()

    expect(Moment(client.state.lastAttempt).toDate())
      .toBeAfter(EPOCH.toDate())
    expect(Moment(client.state.lastPing).toDate())
      .toEqual(EPOCH.toDate())
    expect(Moment(client.state.lastMessage).toDate())
      .toEqual(EPOCH.toDate())

    expect(mockSchedulePingCheck)
      .toBeCalled()
  })

  pit('should action message', async () => {
    var mockOnMessage = jest.fn(_.noop)
    var mockSchedulePingCheck = jest.fn(_.noop)
    var mockMessage = {
      time: Moment().utc().format(ISO_DATE_FORMAT),
      title: 'test',
      message: 'hello world',
    }

    server = fetch.mock('http://localhost/watoto/ping', 'post', {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Watoto-Type': 'PONG-MESSAGE',
      },
      body: mockMessage,
    })
    client = new Network('http://localhost/watoto/ping')
    client.onMessage = mockOnMessage
    client.schedulePingCheck = mockSchedulePingCheck
    await client.ping()

    expect(server.called())
      .toBeTrue()

    expect(Moment(client.state.lastAttempt).valueOf())
      .toBeGreaterThan(EPOCH.valueOf())
    expect(Moment(client.state.lastPing).valueOf())
      .toBeGreaterThan(EPOCH.valueOf())
    expect(Moment(client.state.lastMessage).valueOf())
      .toBe(Moment(mockMessage.time).valueOf())

    expect(mockOnMessage)
      .toBeCalled()
    expect(mockOnMessage)
      .toBeCalledWith(mockMessage)
  })

  pit('should display message', async () => {
    var mockMessage = {
      time: Moment().utc().format(ISO_DATE_FORMAT),
      title: 'test',
      message: 'hello world',
    }

    client = new Network('http://localhost/watoto/ping')
    client.onMessage(mockMessage)

    expect(Alert.alert)
      .toBeCalled()
    expect(Alert.alert.mock.calls[0][0])
      .toBe(mockMessage.title)
    expect(Alert.alert.mock.calls[0][1])
      .toBe(mockMessage.message)
    expect(Alert.alert.mock.calls[0][2])
      .toBeArrayOfSize(1)
  })

  pit('should display update message', async () => {
    var mockMessage = {
      time: Moment().utc().format(ISO_DATE_FORMAT),
      title: 'test',
      message: 'hello world',
      update: true,
    }

    client = new Network('http://localhost/watoto/ping')
    client.onMessage(mockMessage)

    expect(Alert.alert)
      .toBeCalled()
    expect(Alert.alert.mock.calls[0][0])
      .toBe(mockMessage.title)
    expect(Alert.alert.mock.calls[0][1])
      .toBe(mockMessage.message)
    expect(Alert.alert.mock.calls[0][2])
      .toBeArrayOfSize(2)
  })

  pit('should correctly action a ping on check => 2 days ago', async () => {
    var mockPing = jest.fn(_.noop)
    var mockSchedulePingCheck = jest.fn(_.noop)
    var twoDaysAgo = Moment().subtract(2, 'day').valueOf()

    client = new Network('http://localhost/watoto/ping')
    client.ping = mockPing
    client.schedulePingCheck = mockSchedulePingCheck

    client.state.lastAttempt = twoDaysAgo
    client.state.lastPing = twoDaysAgo
    await client.pingCheck()

    expect(mockPing)
      .toBeCalled()
    expect(mockSchedulePingCheck)
      .not.toBeCalled()
  })

  pit('should correctly not action a ping on check => 2 hour ago', async () => {
    var mockPing = jest.fn(_.noop)
    var mockSchedulePingCheck = jest.fn(_.noop)
    var oneHourAgo = Moment().subtract(2, 'hour').valueOf()

    client = new Network('http://localhost/watoto/ping')
    client.ping = mockPing
    client.schedulePingCheck = mockSchedulePingCheck

    client.state.lastAttempt = oneHourAgo
    client.state.lastPing = oneHourAgo
    await client.pingCheck()

    expect(mockPing)
      .not.toBeCalled()
    expect(mockSchedulePingCheck)
      .toBeCalled()
  })

  pit('should correctly action a ping on check => 2 hour ago (attempt), 2 days ago (ping)', async () => {
    var mockPing = jest.fn(_.noop)
    var mockSchedulePingCheck = jest.fn(_.noop)
    var oneHourAgo = Moment().subtract(2, 'hour').valueOf()
    var twoDaysAgo = Moment().subtract(2, 'day').valueOf()

    client = new Network('http://localhost/watoto/ping')
    client.ping = mockPing
    client.schedulePingCheck = mockSchedulePingCheck

    client.state.lastAttempt = oneHourAgo
    client.state.lastPing = twoDaysAgo
    await client.pingCheck()

    expect(mockPing)
      .toBeCalled()
    expect(mockSchedulePingCheck)
      .not.toBeCalled()
  })

  pit('should load persisted state', async () => {
    var mockState = {
      version: 1,
      lastAttempt: Moment().subtract(5, 'days').valueOf(),
      lastPing: Moment().subtract(4, 'days').valueOf(),
      lastMessage: Moment().subtract(3, 'days').valueOf(),
      visited: {
        drug: {
          test: 1,
        },
      },
      latestApp: undefined,
    }
    AsyncStorage.setItem('network.state', JSON.stringify(mockState))

    client = new Network('http://localhost/watoto/ping')
    client.pingCheck = jest.fn(_.noop)
    await client.start()

    expect(client.state)
      .toEqual(mockState)
  })

  pit('should load persisted state for upgrade (< 0.0.3)', async () => {
    var mockState = {
      lastAttempt: Moment().subtract(5, 'days').valueOf(),
      lastPing: Moment().subtract(4, 'days').valueOf(),
      lastMessage: Moment().subtract(3, 'days').valueOf(),
    }
    AsyncStorage.setItem('network.state', JSON.stringify(mockState))

    client = new Network('http://localhost/watoto/ping')
    client.pingCheck = jest.fn(_.noop)
    await client.start()

    expect(client.state.lastAttempt)
      .toBe(mockState.lastAttempt)
    expect(client.state.lastPing)
      .toBe(mockState.lastPing)
    expect(client.state.lastMessage)
      .toBe(mockState.lastMessage)

    expect(client.state.visited)
      .toEqual({})
  })

  pit('should load persisted state for upgrade (= 0.0.3)', async () => {
    var mockState = {
      lastAttempt: Moment().subtract(5, 'days').valueOf(),
      lastPing: Moment().subtract(4, 'days').valueOf(),
      lastMessage: Moment().subtract(3, 'days').valueOf(),
      visited: {},
    }
    AsyncStorage.setItem('network.state', JSON.stringify(mockState))

    client = new Network('http://localhost/watoto/ping')
    client.pingCheck = jest.fn(_.noop)
    await client.start()

    expect(client.state.lastAttempt)
      .toBe(mockState.lastAttempt)
    expect(client.state.lastPing)
      .toBe(mockState.lastPing)
    expect(client.state.lastMessage)
      .toBe(mockState.lastMessage)

    expect(client.state.visited)
      .toEqual({})
    expect(client.state.latestApp)
      .toBeUndefined()
  })

  pit('should save persisted state', async () => {
    var mockState = {
      lastAttempt: Moment().subtract(5, 'days').valueOf(),
      lastPing: Moment().subtract(4, 'days').valueOf(),
      foo: 'bar',
    }

    client = new Network('http://localhost/watoto/ping')
    client.save(mockState)

    var savedState = await AsyncStorage.getItem('network.state', (err, value) => value)
    var expectedState = {
      version: 1,
      lastAttempt: 0,
      lastPing: 0,
      lastMessage: 0,
      visited: {},
      latestApp: undefined,
    }
    _.merge(expectedState, mockState)

    expect(savedState)
      .toEqual(JSON.stringify(expectedState))
  })

  pit('should track visits', async () => {
    var today = Moment().utc().format(DAY_DATE_FORMAT)
    var yesterday = Moment().subtract(1, 'day').utc().format(DAY_DATE_FORMAT)

    var expected = {}
    expected[yesterday] = {
      sweet: {
        jellybeans: 5,
      },
    }
    expected[today] = {
      sweet: {
        jellybeans: 2,
        winegums: 1,
      },
      drug: {
        paracetamol: 1,
      },
    }

    client = new Network('http://localhost/watoto/ping')
    client.state.visited[yesterday] = expected[yesterday]

    client.visit('sweet', 'jellybeans')
    client.visit('sweet', 'jellybeans')
    client.visit('sweet', 'winegums')
    client.visit('drug', 'paracetamol')
    jest.runOnlyPendingTimers()

    expect(client.state.visited)
      .toEqual(expected)
  })

  pit('should overflow tracked visits', async () => {
    var today = Moment().utc().format(DAY_DATE_FORMAT)

    var expected = {}
    expected['overflow'] = {
      sweet: {
        jellybeans: 24,
        winegums: 10,
      },
      drug: {
        paracetamol: 20,
      },
    }
    expected[today] = {
      drug: {
        paracetamol: 1,
      },
    }

    client = new Network('http://localhost/watoto/ping')
    _.forEach(_.rangeRight(1, 5), (x) => {
      var day = Moment().subtract(x, 'day').utc().format(DAY_DATE_FORMAT)
      client.state.visited[day] = {
        sweet: {
          jellybeans: 1,
        },
      }
    })
    _.forEach(_.rangeRight(5, 15), (x) => {
      var day = Moment().subtract(x, 'day').utc().format(DAY_DATE_FORMAT)
      client.state.visited[day] = {
        sweet: {
          jellybeans: 2,
          winegums: 1,
        },
        drug: {
          paracetamol: 2,
        },
      }
    })

    client.visited('drug', 'paracetamol')

    expect(client.state.visited)
      .toEqual(expected)
  })

  pit('should not track short visits', async () => {
    client = new Network('http://localhost/watoto/ping')

    client.visit('sweet', 'jellybeans')
    client.back()
    jest.runOnlyPendingTimers()

    expect(client.state.visited)
      .toEqual({})
  })
})
