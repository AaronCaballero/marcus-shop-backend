import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1741347769064 implements MigrationInterface {
    name = 'CreateProduct1741347769064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_category_enum" AS ENUM('bicycles')`);
        await queryRunner.query(`CREATE TYPE "public"."product_status_enum" AS ENUM('active', 'discontinued', 'out_of_stock')`);
        await queryRunner.query(`CREATE TABLE "product" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" numeric(16,4) DEFAULT '0', "category" "public"."product_category_enum" DEFAULT 'bicycles', "status" "public"."product_status_enum" NOT NULL DEFAULT 'active', "stock" numeric(16,4) DEFAULT '0', "is_customizable" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE INDEX "index_product_category" ON "product" ("category") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."index_product_category"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."product_category_enum"`);
    }

}
