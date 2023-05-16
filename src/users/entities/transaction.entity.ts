import { BaseEntity } from "src/helpers/db.helpers";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { WalletEntity } from "./wallet.entity";

@Entity()
export class TransactionEntity extends BaseEntity {
  @Column({ unique: true })
  ref: string;

  @Column()
  expiration: string;

  @Column()
  amount: number;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.transaction)
  wallet: WalletEntity;

  @ManyToOne(() => UserEntity, (user) => user.transaction)
  user: UserEntity;
}
