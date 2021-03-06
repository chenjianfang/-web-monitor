import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";

const utils = require('./utils');
const cwdRoot = utils.cwdRoot;

let outputName = utils.getPackageConfig('name');
const spacer = '@za/common-';
if (outputName.includes(spacer)) {
    outputName = outputName.split(spacer)[1];
}

export default {
    input: cwdRoot('src/index.tsx'),
    output: [
        {
            file: cwdRoot('libs/index.esm.js'),
            format: 'esm',
        },
        {
            file: cwdRoot('libs/index.esm.min.js'),
            format: 'esm',
            plugins: [
                terser({
                    module: true,
                    format: {
                        comments: false,
                        indent_level: 0,
                    }
                })
            ]
        },
        {
            name: outputName,
            file: cwdRoot('libs/index.umd.js'),
            format: 'umd',
        },
        { // npx terser libs/index.umd.min.js -o libs/web-monitor.min.js -c
            name: outputName,
            file: cwdRoot('libs/index.umd.min.js'),
            format: 'umd',
            plugins: [
                terser({
                    format: {
                        comments: false,
                        indent_level: 0
                    }
                })
            ]
        }
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript(),
        getBabelOutputPlugin({
            allowAllFormats: true,
            presets: ['@babel/preset-env']
        }),
        // babel({ babelHelpers: 'runtime' }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        postcss({
            extract: true,
            config: true,
            modules: true,
        })
    ],
    external: [/@babel\/runtime/]
};
