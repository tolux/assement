import { BaseEntity } from "src/helpers/db.helpers";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { ERoles } from "src/@types/app.types";
import { WalletEntity } from "src/wallet/entities/wallet.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ enum: ERoles, default: ERoles.USER, type: "enum" })
  role: ERoles;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, {
    cascade: true,
  })
  wallet: WalletEntity;

  // @OneToMany(() => Movie, (movies) => movies.user)
  // movies: Movie[];
}
