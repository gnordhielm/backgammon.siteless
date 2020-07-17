const baseConfig = require('./webpack.config')
const paths = require('./paths')
const webpack = require('webpack')

module.exports = function(webpackEnv) {
  const result = baseConfig(webpackEnv)

  return {
    ...result,
    entry: paths.appServerIndexJs,
    output: {
      ...result.output,
      path: paths.functionsBuild,
      filename: 'bundle.js',
      chunkFilename: undefined,
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    node: undefined,
    optimization: {
      ...result.optimization,
      splitChunks: undefined,
      runtimeChunk: undefined,
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    plugins: [
      ...result.plugins,
      new webpack.DefinePlugin({
        window: JSON.stringify(undefined),
      }),
    ],
  }
}
