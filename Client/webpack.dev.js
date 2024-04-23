const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval',
	devServer: {
		static: './dist',
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true
	},
	plugins: [
		new Dotenv({
			path: './dev.env'
		}),
	],
	devServer: {
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true
	},
	optimization: {
		runtimeChunk: true
	}
})