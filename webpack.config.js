const path =  require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
},
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name][contenthash].js",
        clean: true,
        assetModuleFilename: '[name][ext]',
    },

    devtool: 'source-map',

    devServer: {
        static: {
            directory: path.resolve(__dirname, "public")
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            },
            {
                test: /\.{jpg|png|jpeg|gif}$/i,
                type: 'asset/resource'

            }
        ],
    },

    plugins: [
        new htmlWebpackPlugin({
            title: "webpack App",
            filename: "index.html",
            template: 'src/template.html'
        }),

        new BundleAnalyzerPlugin(),
    ]
}