import db from "@src/database"

export const executeQuery = async (query: string, parameters: any[]) => {
  const result = await db.query(query, parameters); 
  return result[0];
}