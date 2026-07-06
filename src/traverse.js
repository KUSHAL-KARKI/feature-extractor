const traverse = require("@babel/traverse").default;

function getFunctions(ast) {

    const functions = [];

    traverse(ast, {

        FunctionDeclaration(path) {

            functions.push(path);

        },

        FunctionExpression(path) {

            functions.push(path);

        },

        ArrowFunctionExpression(path) {

            functions.push(path);

        }

    });

    return functions;
}

module.exports = getFunctions;