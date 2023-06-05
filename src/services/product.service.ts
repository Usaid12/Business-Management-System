import db from '@src/database'
interface CreateProductData {
    name: string;
    description: string;
    price: number
}

interface ProductData extends CreateProductData {
    id: number
    created_at: string;
    updated_at: string;
    deleted_at: string | null
}

export const createProduct = async (data: CreateProductData): Promise<ProductData> => {
    const [product] = await db.query(
        `INSERT INTO 
          categories (name, description, price,created_at, updated_at) 
          VALUES ($1, $2, $3, NOW(), NOW()) 
        RETURNING 
          id,
          name, 
          description,
          price,
          created_at, 
          deleted_at, 
          updated_at
        `,
        [data.name, data.description, data.price],
    );
    return product;
}