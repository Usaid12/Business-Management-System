import { plainToInstance } from 'class-transformer';
import { BaseService } from './base.service';
import { ProductReviews } from '@src/entities/product_reviews.entity';
import { evaluateWhereClause } from '@src/util/evaluateWhereClause';

interface Review {
	user_id: number,
	product_id: number,
	comments: string
}

type ReviewWhere = Partial<Review>;

export default class ReviewService extends BaseService {
  public async writeReviews(data: Review) {
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
    return plainToInstance(ProductReviews, reviewItem);
  }

  public async findReviews(where: ReviewWhere) {
    const query = this.makeSelectQuery(where);
    const reviewItems: unknown[] = await this.db.query(query);
    return plainToInstance(ProductReviews, reviewItems);
  }


  private createWhereClause(where: ReviewWhere) {
    let whereClause = evaluateWhereClause(where, 'r');
    if (whereClause !== '') {
      whereClause += ' AND ';
    }
    whereClause += 'r.deleted_at IS NULL';
    return whereClause;
  }

  private makeSelectQuery(where: ReviewWhere) {
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


  public async findItem(where: ReviewWhere = {}) {
    const query = this.makeSelectQuery(where);
    const reviewItems: unknown[] = await this.db.query(query);
    if (reviewItems.length === 0) return null;
    return plainToInstance(ProductReviews, reviewItems[0]);
  }

  public async deleteReview(data: Omit<Review, 'comments'>) {
    await this.db.query(`
        UPDATE product_reviews AS r
        SET deleted_at = NOW()
        WHERE r.user_id = $1 AND r.product_id = $2
      `, [data.user_id, data.product_id]);
  }
}