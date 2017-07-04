/**
 * 如何开发？
 * 第一步，进入watch监听src变化 znpm run watch
 * 第二部，开启webpack-dev-server服务 znpm run server
 * 更改src的文件导致watch输出文件到dist
 * dist文件改动会触发webpack-dev-server的刷新
 * **/

const path = require( 'path' );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const webpack = require( 'webpack' );
const process = require( 'process' );

const extractSass = new ExtractTextPlugin( {
    filename: "[name]/dist/css/[name].css",
} );

module.exports = {
    devtool: 'source-map',
    entry: {
        Button: [
            path.resolve( __dirname, './Button/src/index.js' ),
            'webpack-dev-server/client?http://localhost:9000/',
        ],
    },

    output: {
        path: path.resolve( __dirname ),
        filename: "[name]/dist/js/[name].js"
    },

    devServer: {
        contentBase: path.join( __dirname ),
        compress: true,
        port: 9000,
        inline:true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract( {
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                } )
            },
            {
                test: /\.css$/,
                use: extractSass.extract( {
                    use: [{
                        loader: "css-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                } )
            }
        ]
    },
    plugins: [
        extractSass
    ],

    resolve: {
        alias: {
            "zzc-base-component": path.resolve(
                __dirname,
                "../dist/"
            )
        }
    },

    
}