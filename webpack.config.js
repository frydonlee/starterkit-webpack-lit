const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const dotenv = require('dotenv')
const path = require('path')

const commonConfig = {
    entry: './src/index.js',
    module: {
        rules: [],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: dotenv.config().parsed.title,
            template: 'src/index.html',
            base: dotenv.config().parsed.base,
        }),
    ],
    output: {
        filename: '[name].[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        hot: true,
        open: true,
        client: {
            progress: true,
        },
    },
}

const productionConfig = {
    mode: 'production',
    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            title: dotenv.config().parsed.title,
            template: 'src/index.html',
            base: dotenv.config().parsed.base,
        }),
    ],
}

const ghpagesProductionConfig = {
    mode: 'production',
    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            title: dotenv.config().parsed.title,
            template: 'src/index.html',
            base: dotenv.config().parsed.base_ghpages,
        }),
    ],

    // output: {
    //     publicPath: '/starterkit-webpack-lit/',
    // },
}

const developmentConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
}

module.exports = (env) => {
    console.log('webpack config : env: ', env)

    if (env.development) {
        console.log('webpack config : export development configuration')
        return merge(commonConfig, developmentConfig)
    }

    if (env.production) {
        if (env.ghpagesbuild) {
            console.log(
                'webpack config : export ghpagesProduction configuration',
            )
            return merge(commonConfig, ghpagesProductionConfig)
        }

        console.log('webpack config : export production configuration')
        return merge(commonConfig, productionConfig)
    }

    throw new Error('webpack config : No matching configuration env was found!')
}
