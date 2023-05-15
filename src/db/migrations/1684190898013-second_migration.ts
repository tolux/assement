import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1684190898013 implements MigrationInterface {
    name = 'SecondMigration1684190898013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "balance" integer NOT NULL, CONSTRAINT "PK_3e429a1b7a56251b6b8ed06050d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "ref" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT true, "expiration" character varying NOT NULL, "amount" integer NOT NULL, CONSTRAINT "UQ_f201d5004f4b14b0988fdd0cf55" UNIQUE ("ref"), CONSTRAINT "PK_6f9d7f02d8835ac9ef1f685a2e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TABLE "transaction_entity"`);
        await queryRunner.query(`DROP TABLE "wallet_entity"`);
    }

}
