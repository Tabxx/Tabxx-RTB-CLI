# RTB-CLI

基于 Rollup+TypeScript + Babel 搭建 ts 脚手架



# What？

为什么选择`rollup`？`webpack`不香吗？

`rollup.js`是一个 `JavaScript` 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。我们比较熟悉的`vue`等知名框架或类库都通过`rollup.js`进行打包。与`webpack`打包的定位不同的是，`rollup.js`侧重于`javascript`类库的打包，webpack侧重于大型应用的打包。

##### rollup的好处

- Tree Shaking: 静态分析代码中的 import，并将排除任何未实际使用的代码（webpack4也实现了类似的功能）


- 可以一次输出多种格式:IIFE, AMD, CJS, UMD, ESM
- 文档精简（文档是真精简）



## TODOs:

* [x] 增加环境变量，分离不同环境的配置
* [x] 修复打包后文件夹没有清理问题
* [x] 开发环境实时刷新页面 --- rollup-plugin-livereload
* [x] 集成测试框架
* [ ] 支持 Vue 开发环境（适合开发单个组件）
* [ ] 打包支持 css 压缩（sass, less）

## Use

1. 全局安装 rollup
   ```npm install rollup -g```
2. 安装 npm 包
   ```npm install```
3. 运行本地服务
   ```npm run dev```
4. 打包
   ```npm run build```
5. jest测试
   ```npm run test```