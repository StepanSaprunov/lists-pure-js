const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        bundle: path.join(__dirname, "src", "index.js"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name][contenthash].js",
        clean: true,
        assetModuleFilename: "[name][ext]"
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        port: 5500,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(svg|png|gif|jpg|jpeg)$/i,
                type: "asset/resource",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack",
            filename: "index.html",
            template: "src/index.html"
        }),
    ]
}