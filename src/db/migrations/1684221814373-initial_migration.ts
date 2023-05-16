import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1684221814373 implements MigrationInterface {
    name = 'InitialMigration1684221814373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."admin_entity_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "admin_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."admin_entity_role_enum" NOT NULL DEFAULT 'admin', CONSTRAINT "UQ_2a4c8cb05264be7377c625c2715" UNIQUE ("email"), CONSTRAINT "PK_bc992df5ddb70aefb955b8a0c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_3e429a1b7a56251b6b8ed06050d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "ref" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT true, "expiration" character varying NOT NULL, "amount" integer NOT NULL, CONSTRAINT "UQ_f201d5004f4b14b0988fdd0cf55" UNIQUE ("ref"), CONSTRAINT "PK_6f9d7f02d8835ac9ef1f685a2e8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction_entity"`);
        await queryRunner.query(`DROP TABLE "wallet_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
        await queryRunner.query(`DROP TABLE "admin_entity"`);
        await queryRunner.query(`DROP TYPE "public"."admin_entity_role_enum"`);
    }

}
