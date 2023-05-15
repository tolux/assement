import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createUserDto } from "src/auth/dto/createUser.dto";
import { authHelpers } from "src/helpers/auth.helpers";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { ISerializedUser, Tuser } from "src/@types/app.types";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async allUsers(): Promise<ISerializedUser[]> {
    const userData: ISerializedUser[] = (await this.userRepository.find()).map(
      (user) => authHelpers.serializeUser(user)
    );
    return userData;
  }

  async findUserById(id: string): Promise<UserEntity | undefined> {
    if (!id) return undefined;
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    if (!email) return undefined;
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(data: createUserDto): Promise<boolean> {
    const user = await this.findUserByEmail(data.email);
    if (user) {
      throw new HttpException(
        "a user with this email address already exists",
        HttpStatus.FORBIDDEN
      );
    }
    const password = await authHelpers.hashPassword(data.password);

    await this.userRepository.save({
      ...data,
      password,
    });
    return true;
  }

  async hello(id: string): Promise<ISerializedUser> {
    const userExists = await this.findUserById(id);

    if (!userExists)
      throw new HttpException("invalid id", HttpStatus.BAD_REQUEST);

    return authHelpers.serializeUser(userExists);
  }

  async updateUser(data: Partial<UserEntity>): Promise<ISerializedUser> {
    const { id, created_at, updated_at, email, role, name, ...rest } = data;
    const userExists = await this.findUserById(id);

    if (!userExists)
      throw new HttpException("invalid id", HttpStatus.BAD_REQUEST);
    await this.userRepository.update({ id }, rest);
    const updatedUser = await this.findUserById(id);
    return authHelpers.serializeUser(updatedUser);
  }
}
