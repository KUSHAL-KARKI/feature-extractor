const parseFile = require("./parser");
const getFunctions = require("./traverse");
const extractMetrics = require("./metrics");

function extract(file){

    const ast = parseFile(file);

    const functions = getFunctions(ast);

    return functions.map(f=>{

        return{

            function_name:
                f.node.id
                    ? f.node.id.name
                    : "anonymous",

            ...extractMetrics(f)

        };

    });

}

module.exports = extract;