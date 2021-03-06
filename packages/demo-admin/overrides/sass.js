const path = require("path");

const overrideSass = function(rules) {
    let parent = rules;
    rules.forEach((rule, index) => {
        if (typeof rule === "string" && rule.includes("sass-loader")) {
            if (parent) {
                const includePaths = [
                    path.resolve("./src"),
                    path.resolve("./node_modules"),
                    path.resolve("../../node_modules")
                ];

                parent.splice(index, 1, {
                    loader: rule,
                    options: { includePaths }
                });
            }
            return;
        }
        if (rule.use || rule.oneOf) {
            parent = rule.use || rule.oneOf;
        }
        overrideSass(rule.use || rule.oneOf || (Array.isArray(rule.loader) && rule.loader) || []);
    });
};

module.exports = config => {
    overrideSass(config.module.rules);
    config.resolve.extensions.push(".scss");
};
