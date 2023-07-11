import { EntityManager } from 'typeorm';

export class BaseService {
  public db: EntityManager;
  constructor(dbManager: EntityManager) {
    this.db = dbManager;
  }
}