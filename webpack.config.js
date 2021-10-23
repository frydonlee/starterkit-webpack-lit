const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge')

const path = require('path')

const commonConfig = {
    entry: './src/index.js',
    module: {
        rules: [
            
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Hello From HtmlWebpackPlugin",
            BASE_URL: "APP",
            template: 'src/index.html'
        }),
    ],
    output: {
        filename: '[name].[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: '/' + dotenv.config().parsed.BASE_URL + '/',
    },
    devServer: {
        hot: true,
        open: true,
        client: {
            progress: true,
          },
        
        //open: true,
        // hot: true,
        //openPage: dotenv.config().parsed.BASE_URL + '/',
        //contentBase: './dist',
        //publicPath: '/' + dotenv.config().parsed.BASE_URL + '/',
        // historyApiFallback: {
        //     index: '/' + dotenv.config().parsed.BASE_URL + '/',
        // },
    },
}

const productionConfig = {
    mode: 'production',
    devtool: 'source-map',
}

const developmentConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
}

module.exports = (env) => {
    console.log('webpack config : env: ', env)

    if (env.development)
    {
        console.log('webpack config : export development configuration')
        return merge(commonConfig, developmentConfig)
    }

    if (env.production)
    {
        console.log('webpack config : export production configuration')
        return merge(commonConfig, productionConfig)
    }

    throw new Error('webpack config : No matching configuration env was found!')
}