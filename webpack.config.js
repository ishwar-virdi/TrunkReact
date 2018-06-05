const path = require('path');

module.exports = {
    entry: path.resolve('./src/index.js'),
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            sourceMap: true
                        }
                    }
                ],
            }
        ]
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    }
};