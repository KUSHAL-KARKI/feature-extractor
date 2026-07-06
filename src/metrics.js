const traverse = require("@babel/traverse").default;

function extractMetrics(functionPath) {
  let metrics = {
    cyclomatic_complexity: 1,

    max_nesting_depth: 0,

    loc: 0,

    parameter_count: functionPath.node.params.length,

    branch_count: 0,

    loop_count: 0,

    return_statement_count: 0,

    is_async: functionPath.node.async,

    await_count: 0,

    has_try_catch: false,

    external_call_count: 0,

    callback_count: 0,

    is_recursive: false,
  };

  let depth = 0;

  const functionName = functionPath.node.id ? functionPath.node.id.name : "";

  functionPath.traverse({
    IfStatement(path) {
      metrics.branch_count++;
      metrics.cyclomatic_complexity++;
    },

    ConditionalExpression() {
      metrics.cyclomatic_complexity++;
    },

    SwitchCase(path) {
      if (path.node.test) {
        metrics.cyclomatic_complexity++;
      }
    },

    ForStatement() {
      metrics.loop_count++;
      metrics.cyclomatic_complexity++;
    },

    ForInStatement() {
      metrics.loop_count++;
      metrics.cyclomatic_complexity++;
    },

    ForOfStatement() {
      metrics.loop_count++;
      metrics.cyclomatic_complexity++;
    },

    WhileStatement() {
      metrics.loop_count++;
      metrics.cyclomatic_complexity++;
    },

    DoWhileStatement() {
      metrics.loop_count++;
      metrics.cyclomatic_complexity++;
    },

    ReturnStatement() {
      metrics.return_statement_count++;
    },

    AwaitExpression() {
      metrics.await_count++;
    },

    TryStatement() {
      metrics.has_try_catch = true;
    },

    CallExpression(path) {
      metrics.external_call_count++;

      if (
        path.node.callee.type === "Identifier" &&
        path.node.callee.name === functionName
      ) {
        metrics.is_recursive = true;
      }

      path.node.arguments.forEach((arg) => {
        if (
          arg.type === "ArrowFunctionExpression" ||
          arg.type === "FunctionExpression"
        ) {
          metrics.callback_count++;
        }
      });
    },

    enter(path) {
      if (
        path.isIfStatement() ||
        path.isForStatement() ||
        path.isWhileStatement() ||
        path.isTryStatement()
      ) {
        depth++;

        metrics.max_nesting_depth = Math.max(metrics.max_nesting_depth, depth);
      }
    },

    exit(path) {
      if (
        path.isIfStatement() ||
        path.isForStatement() ||
        path.isWhileStatement() ||
        path.isTryStatement()
      ) {
        depth--;
      }
    },
  });

  metrics.loc =
    functionPath.node.loc.end.line - functionPath.node.loc.start.line + 1;

  return metrics;
}

module.exports = extractMetrics;
