const path = require("path");
const webpack = require("webpack");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = (env, argv) => {
    return {
        entry: "./src/index.jsx",

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bulid.js",
            globalObject: "this"
        },

        resolve: {
            extensions: [".js", ".jsx"]
        },

        devtool: "eval-source-map",

        stats: "minimal",

        devServer: {
            port: 5000,
            proxy: {
                "/api": "http://localhost:5001"
            },
            overlay: true,
            hot: true
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: ["babel-loader", "eslint-loader"]
                },

                {
                    test: /\.worker\.js$/,
                    use: {
                        loader: "worker-loader",
                        options: {
                            publicPath: "./src/workers/",
                            inline: true
                        }
                    }
                },

                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: miniCssExtractPlugin.loader,
                            options: {
                                hmr: argv.mode === "development"
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [autoprefixer()],
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },

                {
                    test: /\.html$/,
                    use: "html-loader"
                }
            ]
        },

        plugins: [
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html"),
                filename: "index.html"
            }),

            new miniCssExtractPlugin({
                filename: "style.css"
            }),

            new webpack.HotModuleReplacementPlugin()
        ]
    };
};
