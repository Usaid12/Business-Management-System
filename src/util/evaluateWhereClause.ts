export const evaluateWhereClause = <T extends object>(where?: T, alias?: string) => {
  if (!where) return '';
  const wherekeys = Object.keys(where);
  if (wherekeys.length === 0) return ''; 
  const clauses = [];
  for (const key in where) {
    let clauseKey: string = key;
    if (alias) {
      clauseKey = `${alias}.${key}`;
    }
    const value = where[key];
    let clause = `${clauseKey}`;
    if (typeof value === 'string') {
      clause += ` = '${value}'`;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      clause += ` = ${value}`;
    } else if (typeof value === 'object' && value === null) {
      clause += ' IS NULL';
    }
    clauses.push(clause);
  }
  return clauses.join(' AND ');
}; 