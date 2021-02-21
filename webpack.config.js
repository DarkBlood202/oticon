const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "src", "public", "js")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: path.resolve(__dirname, '/node_modules'),
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, '/node_modules'),
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}