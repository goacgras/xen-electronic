import {MigrationInterface, QueryRunner} from "typeorm";

export class freshNewTable1616055921858 implements MigrationInterface {
    name = 'freshNewTable1616055921858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "category" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c9fb58de893725258746385e1" ON "products" ("name") `);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "invoiceNumber" character varying NOT NULL, "totalPrice" integer NOT NULL, "status" character varying NOT NULL, "quantity" integer NOT NULL, "productName" character varying, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_145cac6a7847b5c569e0416450" ON "orders" ("invoiceNumber") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_68fd1ec09140554cf223373d8c5" FOREIGN KEY ("productName") REFERENCES "products"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_68fd1ec09140554cf223373d8c5"`);
        await queryRunner.query(`DROP INDEX "IDX_145cac6a7847b5c569e0416450"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP INDEX "IDX_4c9fb58de893725258746385e1"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
