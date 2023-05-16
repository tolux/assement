import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UserController } from "./user.controller";
import { WalletEntity } from "./entities/wallet.entity";
import { TransactionEntity } from "./entities/transaction.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WalletEntity, TransactionEntity]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
