import { plainToInstance } from 'class-transformer';
import { BaseService } from './base.service';
import { ProductReviews } from '@src/entities/product_reviews.entity';
import { evaluateWhereClause } from '@src/util/evaluateWhereClause';
import { CreateReviewPayload } from '@src/validators/reviews.validator';
import logger from 'jet-logger';

interface productReviews {
    user_id : number,
    product_id : number,
    comments: string
} 

type reviewWhere = Partial <productReviews>;

export default class ReviewService extends BaseService{
    public async writeReviews (data:productReviews){
      const [reviewItem] = await this.db.query(`
      INSERT INTO product_reviews (user_id, product_id, comments, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING
        user_id as "userId",
        product_id as "productId",
        comments as "comments",
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [data.user_id, data.product_id, data.comments]);
    
    }
  
    public async findReviews(where: reviewWhere) {
        const query = this.makeSelectQuery(where);
        const reviewItems: any[] = await this.db.query(query);
        return plainToInstance(ProductReviews, reviewItems);
      }

    
      private createWhereClause(where: reviewWhere) {
        let whereClause = evaluateWhereClause(where, 'r');
        if (whereClause !== '') {
          whereClause += ' AND ';
        }
        whereClause += 'r.deleted_at IS NULL';
        return whereClause;
      }

      private makeSelectQuery(where: reviewWhere) {
        const whereClause = this.createWhereClause(where);
        const query = `
        SELECT 
          r.user_id as "userId",
          r.product_id as "productId",
          r.created_at as "createdAt",
          r.updated_at as "updatedAt",
          r.deleted_at as "deletedAt"
        FROM product_reviews r
        WHERE ${whereClause}
      `;
      return query;
      
      }


      public async findItem(where: reviewWhere = {}) {
        const query = this.makeSelectQuery(where);
        const reviewItems: any[] = await this.db.query(query);
        if (reviewItems.length === 0) return null;
        return plainToInstance(ProductReviews, reviewItems[0]);
      }

      public async deleteReview (data:productReviews){
        const result = await this.db.query(`
        UPDATE product_reviews AS r
        SET deleted_at = NOW()
        WHERE r.user_id = $1 AND r.product_id = $2
      `, [data.user_id, data.product_id]);
      
      }
}