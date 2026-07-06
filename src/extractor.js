const extractMetrics = require("./metrics");
const getComplexityLevel = require("./labeler");

function extract(functionPath) {
  const metrics = extractMetrics(functionPath);

  return {
    function_name: functionPath.node.id?.name || "anonymous",
    ...metrics,
    complexity_level: getComplexityLevel(metrics)
  };
}