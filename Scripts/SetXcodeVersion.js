'use strict'

require('pkginfo')(module)

const exec = require('child_process').execSync

const PLIST_FILE = 'ios/Watoto/Info.plist'

const gitAddToCommit = (file) => {
  var cmd = `git add -A ${file}`
  exec(cmd)
}

const setPlist = (key, value) => {
  var cmd = `/usr/libexec/PlistBuddy -c "Set :${key} ${value}" "${PLIST_FILE}"`
  exec(cmd)
}

const update = () => {
  setPlist('CFBundleVersion', module.exports.buildNumber)
  setPlist('CFBundleShortVersionString', module.exports.version)
}

if (require.main === module) {
  update()
  gitAddToCommit(PLIST_FILE)
}
