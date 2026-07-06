const fg = require("fast-glob");
const parseFile = require("./parser");
const getFunctions = require("./traverse");
const extractMetrics = require("./metrics");
const writeCSV = require("./csvWriter");

(async () => {
  const files = await fg("input/**/*.js");

  const dataset = [];

  for (const file of files) {
    const ast = parseFile(file);

    const functions = getFunctions(ast);

    for (const func of functions) {
      const metrics = extractMetrics(func);

      dataset.push({
        function_name: func.node.id?.name || "anonymous",
        ...metrics
      });
    }
  }

  console.log(dataset);

  await writeCSV(dataset);
})();