module.exports = {
    devtool: "source-map",
    entry: __dirname + "/src/handler.js",
    target: "node",
    externals: ["vertx", "aws-sdk"],
    output: {
        libraryTarget: "commonjs",
        path: __dirname + "/webpack",
        filename: "handler.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            }
        ]
    }
};
