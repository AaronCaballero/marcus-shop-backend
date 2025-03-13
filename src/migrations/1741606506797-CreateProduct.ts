import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1741606506797 implements MigrationInterface {
    name = 'CreateProduct1741606506797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('bicycles')`);
        await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('active', 'discontinued', 'out_of_stock')`);
        await queryRunner.query(`CREATE TABLE "products" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" numeric(16,4) DEFAULT '0', "category" "public"."products_category_enum" DEFAULT 'bicycles', "status" "public"."products_status_enum" NOT NULL DEFAULT 'active', "stock" numeric(16,4) DEFAULT '0', "is_customizable" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_product_category" ON "products" ("category") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."index_product_category"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
    }

}
