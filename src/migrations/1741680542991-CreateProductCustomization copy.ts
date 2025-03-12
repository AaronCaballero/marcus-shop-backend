import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductCustomization1741680542991 implements MigrationInterface {
    name = 'CreateProductCustomization1741680542991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_customizations_category_enum" AS ENUM('bicycles', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."product_customizations_type_enum" AS ENUM('frame_type', 'frame_finish', 'wheels', 'rim_color', 'chain', 'color', 'size', 'material')`);
        await queryRunner.query(`CREATE TABLE "product_customizations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" numeric(16,4) DEFAULT '0', "category" "public"."product_customizations_category_enum" DEFAULT 'bicycles', "type" "public"."product_customizations_type_enum" NOT NULL, "stock" numeric(16,4) DEFAULT '0', "is_required" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c22c117a75fe53b8f9d21649c56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_product_custmizations_category" ON "product_customizations" ("category") `);
        await queryRunner.query(`CREATE TABLE "product_customizations_products" ("customization_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_c195706d30e76da227d9e0ce366" PRIMARY KEY ("customization_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c138b5cef1af5f20cb2d6224f9" ON "product_customizations_products" ("customization_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c39ca902eb68e6d73f49b9910b" ON "product_customizations_products" ("product_id") `);
        await queryRunner.query(`ALTER TYPE "public"."products_category_enum" RENAME TO "products_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('bicycles', 'other')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" TYPE "public"."products_category_enum" USING "category"::"text"::"public"."products_category_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" SET DEFAULT 'bicycles'`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum_old"`);
        await queryRunner.query(`ALTER TABLE "product_customizations_products" ADD CONSTRAINT "FK_c138b5cef1af5f20cb2d6224f9f" FOREIGN KEY ("customization_id") REFERENCES "product_customizations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_customizations_products" ADD CONSTRAINT "FK_c39ca902eb68e6d73f49b9910b1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_customizations_products" DROP CONSTRAINT "FK_c39ca902eb68e6d73f49b9910b1"`);
        await queryRunner.query(`ALTER TABLE "product_customizations_products" DROP CONSTRAINT "FK_c138b5cef1af5f20cb2d6224f9f"`);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum_old" AS ENUM('bicycles')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" TYPE "public"."products_category_enum_old" USING "category"::"text"::"public"."products_category_enum_old"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" SET DEFAULT 'bicycles'`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."products_category_enum_old" RENAME TO "products_category_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c39ca902eb68e6d73f49b9910b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c138b5cef1af5f20cb2d6224f9"`);
        await queryRunner.query(`DROP TABLE "product_customizations_products"`);
        await queryRunner.query(`DROP INDEX "public"."index_product_custmizations_category"`);
        await queryRunner.query(`DROP TABLE "product_customizations"`);
        await queryRunner.query(`DROP TYPE "public"."product_customizations_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."product_customizations_category_enum"`);
    }

}
