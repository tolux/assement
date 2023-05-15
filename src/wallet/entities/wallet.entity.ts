import { BaseEntity } from "src/helpers/db.helpers";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { ERoles } from "src/@types/app.types";
import { UserEntity } from "src/users/entities/user.entity";
import { TransactionEntity } from "./transaction.entity";

@Entity()
export class WalletEntity extends BaseEntity {
  @Column()
  balance: number;

  @OneToOne(() => UserEntity, (user) => user.wallet)
  user: UserEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.wallet, {
    cascade: true,
  })
  transaction: TransactionEntity[];
}
