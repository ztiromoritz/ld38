var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');
var DashboardPlugin = require('webpack-dashboard/plugin');

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/main.js')
        ],
        vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
    },
    devtool: 'source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    watch: true,
    plugins: [
        new DashboardPlugin(),
        definePlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './build']
            }
        })
    ],
    module: {
        rules:

            [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /pixi\.js/,
                use: ['expose-loader?PIXI']
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: /p2\.js/,
                use: ['expose-loader?p2']
            },
            {
                test: /\.(woff|png|jpg|gif|mid|wav)$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'app': path.resolve(__dirname, 'src'),
            'assets': path.resolve(__dirname, 'assets'),
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }
};
