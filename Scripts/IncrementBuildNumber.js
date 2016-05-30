'use strict'

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
  setPackageBuildNumber(module.exports.buildNumber +1)
}

if (require.main === module) {
  update()
}
