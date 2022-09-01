import {terser} from "rollup-plugin-terser";

export default {
    input:"runAsJsSrc/runAsJs.js",
    output:{
        file: 'dist/runAsJs/js/runAsJs.min.js',
        format: 'iife'
    },
    plugins: [terser()]
}