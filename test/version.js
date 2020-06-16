const shell = require('shelljs')
const params = JSON.parse(process.env.npm_config_argv).original
const version = params[3] || 'patch' // 默认patch更新

shell.exec('git add .')
shell.exec('git commit -m "auto commit"')
shell.exec(`npm version ${version}`)
process.exit()