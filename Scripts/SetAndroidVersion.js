'use strict'

require('pkginfo')(module)

const fs = require('fs')
const exec = require('child_process').execSync

const GRADLE_PROPS_FILE = 'android/app/gradle.properties'

const gitAddToCommit = (file) => {
  var cmd = `git add -A ${file}`
  exec(cmd)
}

const update = () => {
  var props =
    `APP_BUILD_NUMBER=${module.exports.buildNumber}\n` +
    `APP_VERSION="${module.exports.version}"\n`

  fs.writeFileSync(GRADLE_PROPS_FILE, props)
}

if (require.main === module) {
  update()
  gitAddToCommit(GRADLE_PROPS_FILE)
}
