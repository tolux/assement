import { UserEntity } from "src/users/entities/user.entity";
import { hash, compare } from "bcrypt";

import { ISerializedAdmin, ISerializedUser } from "src/@types/app.types";
import { AdminEntity } from "src/admin/entities/admin.entity";

const serializeUser = (user: UserEntity): ISerializedUser => {
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const { password, ...serializedUser } = user;
  return serializedUser;
};

const serializeAdmin = (admin: any): ISerializedAdmin => {
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const { password, ...serializedUser } = admin;
  return serializedUser;
};

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return compare(password, hash);
};

const generateOtp = (): number => {
  return Math.floor(Math.random() * 900000);
};

export const authHelpers = {
  serializeUser,
  hashPassword,
  verifyPassword,
  generateOtp,
  serializeAdmin,
};
