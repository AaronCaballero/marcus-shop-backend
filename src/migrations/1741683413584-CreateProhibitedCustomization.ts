import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProhibitedCustomization1741683413584 implements MigrationInterface {
    name = 'CreateProhibitedCustomization1741683413584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prohibited_customizations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_315c5a2c2e79c62cbb4d3b37d0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_prohibited_customizations" ("product_id" uuid NOT NULL, "prohibited_customization_id" uuid NOT NULL, CONSTRAINT "PK_aa86fa97c85ad58661198b7aa44" PRIMARY KEY ("product_id", "prohibited_customization_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f644687d63dfb39906060f617a" ON "product_prohibited_customizations" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3bc0083886230f32f6cb24f6a1" ON "product_prohibited_customizations" ("prohibited_customization_id") `);
        await queryRunner.query(`CREATE TABLE "prohibited_customizations_combinations" ("prohibited_customization_id" uuid NOT NULL, "customization_id" uuid NOT NULL, CONSTRAINT "PK_1fe127e4e4e2e943638171720ab" PRIMARY KEY ("prohibited_customization_id", "customization_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d1fb816a80a8d6486f9b103547" ON "prohibited_customizations_combinations" ("prohibited_customization_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dfc4fd3d1b93c767658715dfa8" ON "prohibited_customizations_combinations" ("customization_id") `);
        await queryRunner.query(`ALTER TABLE "product_prohibited_customizations" ADD CONSTRAINT "FK_f644687d63dfb39906060f617a5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_prohibited_customizations" ADD CONSTRAINT "FK_3bc0083886230f32f6cb24f6a1c" FOREIGN KEY ("prohibited_customization_id") REFERENCES "prohibited_customizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prohibited_customizations_combinations" ADD CONSTRAINT "FK_d1fb816a80a8d6486f9b1035471" FOREIGN KEY ("prohibited_customization_id") REFERENCES "prohibited_customizations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "prohibited_customizations_combinations" ADD CONSTRAINT "FK_dfc4fd3d1b93c767658715dfa89" FOREIGN KEY ("customization_id") REFERENCES "product_customizations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prohibited_customizations_combinations" DROP CONSTRAINT "FK_dfc4fd3d1b93c767658715dfa89"`);
        await queryRunner.query(`ALTER TABLE "prohibited_customizations_combinations" DROP CONSTRAINT "FK_d1fb816a80a8d6486f9b1035471"`);
        await queryRunner.query(`ALTER TABLE "product_prohibited_customizations" DROP CONSTRAINT "FK_3bc0083886230f32f6cb24f6a1c"`);
        await queryRunner.query(`ALTER TABLE "product_prohibited_customizations" DROP CONSTRAINT "FK_f644687d63dfb39906060f617a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dfc4fd3d1b93c767658715dfa8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d1fb816a80a8d6486f9b103547"`);
        await queryRunner.query(`DROP TABLE "prohibited_customizations_combinations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bc0083886230f32f6cb24f6a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f644687d63dfb39906060f617a"`);
        await queryRunner.query(`DROP TABLE "product_prohibited_customizations"`);
        await queryRunner.query(`DROP TABLE "prohibited_customizations"`);
    }

}
