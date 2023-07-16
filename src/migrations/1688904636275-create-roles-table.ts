import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesTable1688904636275 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`	CREATE TABLE public.roles (
					id serial4 NOT NULL,
					created_at timestamptz NOT NULL DEFAULT now(),
					updated_at timestamptz NULL DEFAULT now(),
					deleted_at timestamptz NULL,
					"name" varchar NOT NULL,
					CONSTRAINT roles_pkey PRIMARY KEY (id)
				);`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP CONSTRAINT roles_pkey;`);
		await queryRunner.query(`DROP TABLE public.roles;`);
	}

}
