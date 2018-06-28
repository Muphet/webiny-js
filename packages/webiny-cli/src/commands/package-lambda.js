/* eslint-disable */
const path = require("path");
const webpack = require("webpack");

exports.command = "package-lambda <folder>";
exports.describe = "Package lambda function.";
exports.builder = (yargs: Object) => {
    return yargs.positional("folder", {
        describe: "Folder containing Lambda function.",
        type: "string"
    });
};

exports.handler = function(argv: Object) {
    const folder = path.join(process.cwd(), argv.folder === "." ? "" : argv.folder);
    const config = require(path.join(folder, "webpack.config.js"));

    webpack(config).run(async function(err, stats) {
        if (err) console.error(err);

        console.log(stats.toString({ colors: true }));
    });
};
