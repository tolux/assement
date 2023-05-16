import { BaseEntity } from "src/helpers/db.helpers";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { WalletEntity } from "./wallet.entity";

@Entity()
export class TransactionEntity extends BaseEntity {
  @Column({ unique: true })
  ref: string;

  @Column({ default: true })
  valid: boolean;

  @Column()
  expiration: string;

  @Column()
  amount: number;

  @OneToOne(() => WalletEntity, (wallet) => wallet.transaction)
  wallet: WalletEntity;
}
