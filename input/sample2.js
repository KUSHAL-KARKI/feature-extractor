function buildQuery(table, conditions, sort, limit) {
  let query = `SELECT * FROM${table}`;

  if (conditions && conditions.length > 0) {
    query += " WHERE ";
    const whereClauses = [];

    for (let condition of conditions) {
      if (condition.operator === "=") {
        whereClauses.push(`${condition.field} = '${condition.value}'`);
      } else if (condition.operator === ">") {
        whereClauses.push(`${condition.field} >${condition.value}`);
      } else if (condition.operator === "<") {
        whereClauses.push(`${condition.field} <${condition.value}`);
      } else if (condition.operator === "LIKE") {
        whereClauses.push(`${condition.field} LIKE '%${condition.value}%'`);
      }
    }

    query += whereClauses.join(" AND ");
  }

  if (sort) {
    query += ` ORDER BY${sort.field}${sort.direction || "ASC"}`;
  }

  if (limit) {
    query += ` LIMIT${limit}`;
  }

  return query;
}
