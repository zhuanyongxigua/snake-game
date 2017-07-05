var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: ["./app/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=5000&name=image/[hash:8].[name].[ext]"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', //在webpack的module部分 的loaders里进行配置即可
                query: {
                    presets: ['es2015']
                }
            }
        ]

    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
        inject: 'body'
    })]
};
