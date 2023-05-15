import { ERoles } from "src/@types/app.types";
import { BaseEntity } from "src/helpers/db.helpers";
import { Column, Entity } from "typeorm";

@Entity()
export class AdminEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: ERoles, type: "enum", default: ERoles.ADMIN })
  role: ERoles;
}
