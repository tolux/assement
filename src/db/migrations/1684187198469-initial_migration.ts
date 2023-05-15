import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1684187198469 implements MigrationInterface {
    name = 'InitialMigration1684187198469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."admin_entity_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "admin_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."admin_entity_role_enum" NOT NULL DEFAULT 'admin', CONSTRAINT "UQ_2a4c8cb05264be7377c625c2715" UNIQUE ("email"), CONSTRAINT "PK_bc992df5ddb70aefb955b8a0c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "address" character varying NOT NULL, "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
        await queryRunner.query(`DROP TABLE "admin_entity"`);
        await queryRunner.query(`DROP TYPE "public"."admin_entity_role_enum"`);
    }

}
