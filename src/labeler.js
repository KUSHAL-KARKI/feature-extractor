function getComplexityLevel(metrics) {
  let score = 0;

  // Cyclomatic Complexity
  if (metrics.cyclomatic_complexity >= 10) score += 4;
  else if (metrics.cyclomatic_complexity >= 6) score += 2;

  // Nesting
  if (metrics.max_nesting_depth >= 4) score += 3;
  else if (metrics.max_nesting_depth >= 2) score += 1;

  // Lines of Code
  if (metrics.loc >= 50) score += 2;
  else if (metrics.loc >= 20) score += 1;

  // Branches
  if (metrics.branch_count >= 6) score += 2;

  // Loops
  if (metrics.loop_count >= 2) score += 1;

  // Async
  if (metrics.is_async) score += 1;

  // Await
  if (metrics.await_count >= 2) score += 1;

  // Exception Handling
  if (metrics.has_try_catch) score += 1;

  // Recursion
  if (metrics.is_recursive) score += 2;

  if (score <= 3) return "Easy";
  if (score <= 8) return "Medium";

  return "Hard";
}

module.exports = getComplexityLevel;