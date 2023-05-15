import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletEntity } from "./entities/wallet.entity";
import { TransactionEntity } from "./entities/transaction.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, TransactionEntity])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
