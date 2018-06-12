const path = require('path');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
    stylesDir: path.join(__dirname, './styles'),
    antDir: path.join(__dirname, './node_modules/antd'),
    varFile: path.join(__dirname, './styles/variables-for-generation.less'),
    mainLessFile: path.join(__dirname, './styles/index.less'),
    themeVariables: [
        '@primary-color',
        '@info-color',
        '@success-color',
        '@error-color',
        '@highlight-color',
        '@warning-color',
        '@normal-color',
        '@body-background',
        '@component-background',
        '@heading-color',
        '@text-color',
        '@text-color-secondary',
        '@heading-color-dark',
        '@text-color-dark',
        '@text-color-secondary-dark',
        '@border-color-base',
        '@border-color-split',
        '@background-color-light',
        '@background-color-base',
        '@disabled-color',
        '@disabled-color-dark',
        '@btn-primary-color',
        '@btn-default-bg',
        '@layout-body-background',
        '@layout-header-background',
        '@layout-trigger-color',
        '@layout-sider-background-light',
        '@layout-trigger-background-light',
        '@input-placeholder-color',
        '@input-bg',
        '@tooltip-color',
        '@tooltip-bg',
        '@popover-bg',
        '@modal-mask-bg',
        '@menu-dark-arrow-color',
        '@menu-dark-submenu-bg',
        '@menu-dark-submenu-bg',
        '@table-selected-row-bg',
        '@table-expanded-row-bg',
        '@back-top-color',
        '@avatar-bg',
        '@avatar-color',
        '@slider-rail-background-color-hover'
    ],
    indexFileName: false
};

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        library: 'Amili',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: __dirname,
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'babel-preset-env',
                            'babel-preset-react',
                            'babel-preset-stage-2'],
                        plugins: [
                            'transform-runtime',
                            [
                                'import',
                                [
                                    {
                                        'libraryName': 'antd',
                                        'style': true   // or 'css'
                                    }
                                ]
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: {
                                before: '#theme'
                            }
                        }
                    }, {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }]
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /(src)/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: {
                                before: '#theme'
                            }
                        }
                    }, {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    plugins: [new AntDesignThemePlugin(options)]
};
