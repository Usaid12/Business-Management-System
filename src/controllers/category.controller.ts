import db from '@src/database';
import { CreateCategoryPayload } from '@src/validators/category.validator';
import { NextFunction, Request, Response } from 'express';
import * as categoryService from '@src/services/category.service';
import type { GetCategoryWhere } from '@src/services/category.service'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as CreateCategoryPayload;
    if (data.parentId) {
      const parentCategory = await categoryService.getCategory({ id: data.parentId });
      if (!parentCategory) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Parent doesn\'t exists');
      }
    }
    const category = await categoryService.createCategory(data);
    return res.status(HttpStatusCodes.CREATED).json({
      message: 'Category created',
      data: category,
      statusCode: HttpStatusCodes.CREATED,
    });
  } catch (error) {
    next(error);
  }
};


export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const where: Partial<GetCategoryWhere> = { };
    if (req.query.parent_id) {
      const parentId = parseInt(req.query.parent_id.toString(), 10);
      if (isNaN(parentId)) throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'parent_id should be a string');
      const parentCategory = await categoryService.getCategoryById(parentId);
      if (!parentCategory) throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Parent category not found');
      where.parent_id =  parentId;
    } else {
      where.parent_id = null;
    }
    const categories = await categoryService.getCategories(where);
    res.status(HttpStatusCodes.OK).json({
      data: categories,
      message: 'Category List',
      statusCode: HttpStatusCodes.OK,
    })
  } catch (error) {
    next(error);
  }
}


export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Invalid id');
    const category = await categoryService.getCategoryById(id);
    if (!category) throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Category not found');
    res.status(HttpStatusCodes.OK).json({
      data: category,
      message: 'Category List',
      statusCode: HttpStatusCodes.OK
    })
  } catch (error) {
    next(error);
  }
}