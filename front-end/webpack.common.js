const {resolve} = require('path');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
    // context: resolve('src'),
    entry: "./src/index.tsx",
    devServer:{
        contentBase: resolve('../back-end/src/main/resources/public/'),
        historyApiFallback: true,
    },
    output: {
        // path: resolve('../back-end/src/main/resources/public/'),
        path: resolve('../back-end/src/main/resources/public/'),
        filename: "bundle.js",
        // publicPath: '/uploads',
        // publicPath: resolve('../back-end/src/main/resources/public/'),

    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new DotenvPlugin({
            sample: './.env.hide',
            path: './.env',
            safe: true
        })
    ],
    module: {
        loaders: [
            {test: /\.([tj])sx?$/, exclude: /node_modules/, use: {loader: 'awesome-typescript-loader'}},
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: '/'
                        }
                    }
                ]
            }
        ]
    },
    node: {
        dns: 'empty',
        net: 'empty',
        fs: 'empty'
    }
};
