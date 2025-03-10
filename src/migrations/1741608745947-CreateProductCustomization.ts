import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductCustomization1741608745947 implements MigrationInterface {
    name = 'CreateProductCustomization1741608745947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_customizations_type_enum" AS ENUM('color', 'size', 'material', 'aditional_feature')`);
        await queryRunner.query(`CREATE TABLE "product_customizations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" numeric(16,4) DEFAULT '0', "type" "public"."product_customizations_type_enum" NOT NULL DEFAULT 'aditional_feature', "stock" numeric(16,4) DEFAULT '0', "is_required" boolean NOT NULL DEFAULT false, "product_id" uuid, CONSTRAINT "PK_c22c117a75fe53b8f9d21649c56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_customizations" ADD CONSTRAINT "FK_07b2a022f01779cd91e8159e70e" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_customizations" DROP CONSTRAINT "FK_07b2a022f01779cd91e8159e70e"`);
        await queryRunner.query(`DROP TABLE "product_customizations"`);
        await queryRunner.query(`DROP TYPE "public"."product_customizations_type_enum"`);
    }

}
