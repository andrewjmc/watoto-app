'use strict'

const SemVer = require('semver')
require('pkginfo')(module)

const exec = require('child_process').execSync

const PACKAGE_FILE = 'package.json'
const BACKUP_EXT = '.bk'

const setPackageBuildNumber = (buildNum) => {
  var modifyCmd = `sed -i ${BACKUP_EXT} 's/"buildNumber": [0-9]*,$/"buildNumber": ${buildNum},/' ${PACKAGE_FILE}`
  exec(modifyCmd)

  var cleanupCmd = `rm -f ${PACKAGE_FILE}${BACKUP_EXT}`
  exec(cleanupCmd)
}

const update = () => {
  var buildNumber = (
    100 * SemVer.major(module.exports.version) +
     10 * SemVer.minor(module.exports.version) +
      1 * SemVer.patch(module.exports.version)
  )
  setPackageBuildNumber(buildNumber)
}

if (require.main === module) {
  update()
}
