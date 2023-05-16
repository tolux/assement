import { AdminEntity } from "src/admin/entities/admin.entity";
import { UserEntity } from "src/users/entities/user.entity";

type ISerializedUser = Omit<UserEntity, "password">;
type ISerializedAdmin = Omit<AdminEntity, "password">;

type Tuser = {
  id: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  address: string;
  email: string;
};
enum ERoles {
  USER = "user",
  ADMIN = "admin",
}

type TQuery = {
  limit?: number;
  page?: number;
};

export type { Tuser, ISerializedUser, ISerializedAdmin, TQuery };

export { ERoles };
