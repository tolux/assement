import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1684230589940 implements MigrationInterface {
    name = 'InitialMigration1684230589940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "ref" character varying NOT NULL, "expiration" character varying NOT NULL, "amount" integer NOT NULL, "walletId" uuid, CONSTRAINT "UQ_f201d5004f4b14b0988fdd0cf55" UNIQUE ("ref"), CONSTRAINT "PK_6f9d7f02d8835ac9ef1f685a2e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_3e429a1b7a56251b6b8ed06050d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'user', "walletId" uuid, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "REL_1f43db15bcdafc1887b151898d" UNIQUE ("walletId"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."admin_entity_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "admin_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."admin_entity_role_enum" NOT NULL DEFAULT 'admin', CONSTRAINT "UQ_2a4c8cb05264be7377c625c2715" UNIQUE ("email"), CONSTRAINT "PK_bc992df5ddb70aefb955b8a0c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction_entity" ADD CONSTRAINT "FK_87db55a40ffd6f22567d0319da6" FOREIGN KEY ("walletId") REFERENCES "wallet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_1f43db15bcdafc1887b151898db" FOREIGN KEY ("walletId") REFERENCES "wallet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_1f43db15bcdafc1887b151898db"`);
        await queryRunner.query(`ALTER TABLE "transaction_entity" DROP CONSTRAINT "FK_87db55a40ffd6f22567d0319da6"`);
        await queryRunner.query(`DROP TABLE "admin_entity"`);
        await queryRunner.query(`DROP TYPE "public"."admin_entity_role_enum"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
        await queryRunner.query(`DROP TABLE "wallet_entity"`);
        await queryRunner.query(`DROP TABLE "transaction_entity"`);
    }

}
