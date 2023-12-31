const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    // TODO: Change to production respectively
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.tsx', '.jsx']
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'public/index.html',
        hash: true,
        filename: '../dist/index.html'
    })]
}

