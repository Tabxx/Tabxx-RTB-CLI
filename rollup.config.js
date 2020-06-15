import base from './build/rollup.config.base'
import serve from 'rollup-plugin-serve'
import clear from 'rollup-plugin-clear'
import livereload from 'rollup-plugin-livereload'
import {
  terser
} from 'rollup-plugin-terser'
const env = process.env.NODE_ENV

if (env === 'development') {
  base.plugins.push(
    serve({
      open: true, // 是否打开浏览器
      contentBase: './', // 入口html的文件位置
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
      port: 10001
    }),
    livereload()
  )
} else {
  base.plugins.push(terser(), clear({
    targets: ['dist'],
    watch: false,
  }))
}

export default base