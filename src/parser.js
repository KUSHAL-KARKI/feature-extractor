const fs = require("fs");
const parser = require("@babel/parser");

function parseFile(filePath) {
    const code = fs.readFileSync(filePath, "utf8");

    return parser.parse(code, {
        sourceType: "unambiguous",
        plugins: [
            "jsx",
            "typescript",
            "classProperties"
        ]
    });
}

module.exports = parseFile;