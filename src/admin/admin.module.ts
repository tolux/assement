import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./entities/admin.entity";
import { UsersModule } from "src/users/users.module";
import { TransactionEntity } from "src/users/entities/transaction.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, TransactionEntity]),
    UsersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
