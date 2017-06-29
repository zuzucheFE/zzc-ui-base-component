const path = require( 'path' );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const webpack = require( 'webpack' );

const extractSass = new ExtractTextPlugin( {
    filename: "[name]/dist/css/[name].css",
} );

module.exports = {
    devtool: 'source-map',
    entry: {
        Button: path.resolve( __dirname, './Button/src/index.js' ),
    },

    output: {
        path: path.resolve( __dirname ),
        filename: "[name]/dist/js/[name].js"
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
                "../src/"
            )
        }
    },
}