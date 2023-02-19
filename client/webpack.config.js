const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    devServer: {
      // The `hot` option is to use the webpack-dev-server in combination with the hot module replacement API.
      hot: 'only',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Reloading',
        template: './index.html',
      }),

    new InjectManifest ({
      swSrc:"./src-sw.js",
      swDest:"src-sw.js",
    }),

      // new GenerateSW(),
      new WebpackPwaManifest({
        // TODO: Create a manifest.json:
        name: 'Manifest',
        short_name: 'Manif',
        description: "Keep track of important tasks!",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]

      }),
     
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
