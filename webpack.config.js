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
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'app/index.html'),
        filename: 'index.html',
        inject: 'body'
    })]
};
