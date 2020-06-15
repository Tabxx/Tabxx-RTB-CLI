const wget = require('node-wget')
const exec = require('child_process').exec
const url = 'https://www.xxtab.cn/assets/plugins'
const plugins = require('./plugins.json')
const original = JSON.parse(process.env.npm_config_argv).original
const [type, pluginName] = [original[2], original[3]]

if (type == 'add') {
    addPlugins(pluginName)
}

/**
 * 添加插件
 * @param {*} pluginName 插件名称
 */
function addPlugins(pluginName) {
    if (plugins[pluginName]) {
        console.log('The plug-in already exists!')
    }

    wget({
        url: `${url}/${pluginName}.js`,
        dest: './plugins/',
    })
}