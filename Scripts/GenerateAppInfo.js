'use strict'

require('pkginfo')(module)

const fs = require('fs')
const git = require('git-info-sync')
const moment = require('moment')

const APPINFO_FILE = 'Source/AppInfo.js'

const generate = () => {
  // var version = require('../package.json').version
  var gitInfo = git([
    'shortSHA',
    'lastCommitTime',
  ])

  var appInfo = {
    'name': module.exports.name,
    'buildVersion': module.exports.version,
    'buildTime': moment().utc().format('YYYY-MM-DD HH:mm:ss ZZ'),
    'sourceVersion': gitInfo['shortSHA'],
    'sourceTime': gitInfo['lastCommitTime'],
  }

  var contents = `module.exports = ${JSON.stringify(appInfo, null, 2).replace(/\"/g, '\'')}\n`
  fs.writeFileSync(APPINFO_FILE, contents)
}

if (require.main === module) {
  generate()
}
