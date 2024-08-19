const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: {
        ui: './src/ui.tsx', // This is the entry point for UI code.
        code: './src/code.ts' // This is the entry point for our plugin code.
    },
    module: {
        rules: [
            // Converts TypeScript code to JavaScript
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
        clean: true, // Clean the output directory before emit
    },
    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
        new webpack.DefinePlugin({
            global: {}, // Fix missing symbol error when running in developer VM
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/ui.html',
            filename: 'ui.html',
            chunks: ['ui'],
        }),
        new HtmlInlineScriptPlugin({
            htmlMatchPattern: [/ui.html/],
            scriptMatchPattern: [/.js$/],
        }),
    ],
});
