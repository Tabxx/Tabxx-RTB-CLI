const shell = require('shelljs')
const original = JSON.parse(process.env.npm_config_argv).original
const commit = original[3] || 'auto commit'

shell.exec('git status')
shell.exec('git add .')
shell.exec(`git commit -m "${commit}"`)
shell.exec('git pull')
shell.exec('git status').code === 0 && shell.exec('git push').code === 0 && console.log('代码提交成功！');
process.exit();