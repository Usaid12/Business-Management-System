import { withTransaction } from '@src/util/withTransaction';
import { CreateCategoryPayload } from '@src/validators/category.validator';
import CategorySerivce from '@src/services/category.service';
import type { GetCategoryWhere } from '@src/services/category.service';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
export const createCategory = withTransaction(async (manager, req) => {
  const data = req.body as CreateCategoryPayload;
  const categoryService = new CategorySerivce(manager);
  if (data.parentId) {
    const parentCategory = await categoryService.findOne({ id: data.parentId });
    if (!parentCategory) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Parent doesn\'t exists');
    }
  }
  const category = await categoryService.create(data);
  return {
    message: 'Category created',
    data: category,
    statusCode: HttpStatusCodes.CREATED,
  };
});


export const getCategories = withTransaction(async (manager, req) => {
  const where: Partial<GetCategoryWhere> = { };
  const categoryService = new CategorySerivce(manager);
  if (req.query.parent_id) {
    const parentId = parseInt(req.query.parent_id.toString(), 10);
    if (isNaN(parentId)) throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'parent_id should be a string');
    const parentCategory = await categoryService.findById(parentId);
    if (!parentCategory) throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Parent category not found');
    where.parent_id =  parentId;
  } else {
    where.parent_id = null;
  }
  const categories = await categoryService.findAll(where);
  return {
    data: categories,
    message: 'Category List',
    statusCode: HttpStatusCodes.OK,
  };
});


export const getCategoryById = withTransaction(async (manager, req) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Invalid id');
  const categoryService = new CategorySerivce(manager);
  const category = await categoryService.findById(id);
  if (!category) throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Category not found');
  return {
    data: category,
    message: 'Category List',
    statusCode: HttpStatusCodes.OK,
  };
});