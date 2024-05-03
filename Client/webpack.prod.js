const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const Dotenv = require('dotenv-webpack')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin(),
		],
	},
	plugins: [
		new Dotenv({
			path: './prod.env'
		}),
	],
})
