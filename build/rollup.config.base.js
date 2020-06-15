import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'umd', // 通用模块定义，以amd，cjs 和 iife 为一体
        sourcemap: false,
    },
    plugins: [
        terser(),
        babel({
            exclude: 'node_modules/**',
        }),
        commonjs(),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript'),
        }),
    ],
}
