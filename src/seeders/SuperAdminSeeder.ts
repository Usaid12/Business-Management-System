import { DataSource } from 'typeorm';

export default class SuperAdminSeeder {
  public static async run(dataSource: DataSource) {
    const query_runner = dataSource.createQueryRunner();
    try {
      await query_runner.startTransaction();
      


      await query_runner.commitTransaction();
    } catch (error) {
      await query_runner.rollbackTransaction();
    } finally {
      await query_runner.release();
    }
  }
}