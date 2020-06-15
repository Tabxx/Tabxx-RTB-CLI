const wget = require('node-wget')
const fs = require('fs')
const chalk = require('chalk')
const url = 'https://www.xxtab.cn/assets/plugins'
const plugins = require('./plugins.json')
const original = JSON.parse(process.env.npm_config_argv).original
const [type, pluginName] = [original[2], original[3]]

/**
 * 插件管理器
 */
const pluginManage = {
    add: () => {
        addPlugins(pluginName)
    },
    del: () => {
        delPlugins(pluginName)
    },
    update: () => {
        addPlugins(pluginName)
    }
}

if (!pluginManage[type]) {
    console.log(chalk.red('Instruction does not exist~'));
    process.exit(0)
}
pluginManage[type] && pluginManage[type]()


/**
 * 添加插件
 * @param {*} pluginName 插件名称
 */
function addPlugins(pluginName) {
    if (plugins[pluginName]) {
        console.log('The plug-in already exists!')
        return;
    }

    wget({
        url: `${url}/${pluginName}.js`,
        dest: './plugins/',
    }, function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1)
        }
        // TODO:npm install 
        editPluginsJson('add', pluginName);
    })
}

/**
 * 删除插件
 * @param {*} pluginName 插件名称
 */
function delPlugins(pluginName) {
    if (!plugins[pluginName]) {
        console.log(chalk.red('Plug-in dont exist'));
        process.exit(0)
    }

    fs.unlink(__dirname + `/${pluginName}.js`, (err) => {
        if (err) {
            console.log(err);
        } else {
            // TODO:npm uninstall 
            editPluginsJson('del', pluginName)
        }
    });
}

/**
 * 修改plugins.json
 * @param {*} type 操作类型  add/del
 * @param {*} pluginName 插件名称
 */
function editPluginsJson(type, pluginName) {
    if (['add', 'update'].includes(type)) {
        plugins[pluginName] = {
            v: 'v1.0' // 版本扩展
        }
    } else if (type == 'del') {
        delete plugins[pluginName]
    }

    // plugins写入templates.json
    fs.writeFile(
        __dirname + '/plugins.json',
        JSON.stringify(plugins, '', '\t'),
        'utf-8',
        (err) => {
            // 处理错误
            if (err) {
                console.log(chalk.red(err))
                process.exit()
            }
            console.log(chalk.green('successfully!'))
            process.exit()
        }
    )
}