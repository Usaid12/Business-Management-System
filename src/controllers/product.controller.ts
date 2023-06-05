import { Request, Response, NextFunction } from 'express'
import * as ProductService from '@src/services/product.service'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const product = await ProductService.createProduct(data)
        res.status(HttpStatusCodes.CREATED).json({
            data: product,
            statusCode: HttpStatusCodes.CREATED,
            message: 'Product created successfully',
        })
    } catch (error) {
        next(error)
    }
}