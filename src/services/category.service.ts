import db from '@src/database';
import { evaluateWhereClause } from '@src/util/evaluateWhereClause';
import { CreateCategoryPayload } from '@src/validators/category.validator';

export const createCategory = async (data: CreateCategoryPayload) => {
  const [category] = await db.query(
    `INSERT INTO 
      categories (name, parent_id, created_at, updated_at) 
      VALUES ($1, $2, NOW(), NOW()) 
    RETURNING 
      id,
      name, 
      parent_id, 
      created_at, 
      deleted_at, 
      updated_at
    `,
    [data.name, data?.parentId ?? null],
  );
  return category;
};


export type GetCategoryWhere = {
	id: number;
	name: string;
	parent_id: number | null
}

const makeSelectCategoryQuery = (where?: Partial<GetCategoryWhere>) => {
  let query = `SELECT 
  c.id as id, 
  c.name as name, 
  c.parent_id as parentId, 
  c.created_at as createdAt,
  c.updated_at as updatedAt, 
  c.deleted_at as deletedAt 
FROM categories c`;
  let whereExp = evaluateWhereClause(where, 'c');
  if (whereExp !== '') { 
    whereExp += ' AND ';
  }
  whereExp += 'c.deleted_at IS NULL';
  query += ` WHERE ${whereExp}`;
  return query;
};

export const getCategory = async (where?: Partial<GetCategoryWhere>) => {
  let query = makeSelectCategoryQuery(where);
  query += ' LIMIT 1';
  const result = await db.query(query);
  if (result.length === 0) return null;
  return result[0];
};

export const getCategoryById = async (id: number) => {
  return await getCategory({ id });
};

export const getCategories = async (where?: Partial<GetCategoryWhere>) => {
  const query = makeSelectCategoryQuery(where);
  const result = await db.query(query);
  return result;
};

