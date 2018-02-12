const {resolve} = require('path');
const webpack = require('webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
    // context: resolve('src'),
    entry: "./src/index.tsx",
    output: {
        path: resolve('../back-end/src/main/resources/js/'),
        filename: "bundle.js",
        publicPath: 'src/resources',
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
            { test: /\.([tj])sx?$/, exclude: /node_modules/, use: { loader: 'awesome-typescript-loader' } },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
        fs:'empty'
    }
};