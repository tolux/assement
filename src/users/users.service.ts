import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createUserDto } from "src/auth/dto/createUser.dto";
import { authHelpers } from "src/helpers/auth.helpers";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { ISerializedUser, TQuery } from "src/@types/app.types";
import { WalletEntity } from "./entities/wallet.entity";
import { TransactionEntity } from "./entities/transaction.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>
  ) {}

  async allUsers(): Promise<ISerializedUser[]> {
    const userData: ISerializedUser[] = (await this.userRepository.find()).map(
      (user) => authHelpers.serializeUser(user)
    );
    return userData;
  }

  async getAllTransactions(query: TQuery, id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["wallet"],
    });

    const take = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;

    if (!user) throw new HttpException("invalid id", HttpStatus.BAD_REQUEST);

    const [result, total] = await this.transactionRepository.findAndCount({
      relations: {
        wallet: true,
      },
      where: {
        wallet: {
          id: user.wallet.id,
        },
      },
      take,
      skip,
    });

    const lastPage = Math.ceil(total / take);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    const allTransactions = {
      data: result,
      total,
      lastPage,
      nextPage,
      prevPage,
    };

    return allTransactions;
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

  async genTrnasction(id: string, amount: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["wallet"],
    });

    if (!user) {
      throw new HttpException("invalid user", HttpStatus.FORBIDDEN);
    }

    const date = new Date();
    const ref = `${user.name.slice(0, 3)}${date.getTime()}`;
    date.setSeconds(date.getSeconds() + 15);
    const expiration = date.getTime().toString();
    const transactionData = { expiration, wallet: user.wallet, amount, ref };
    return await this.transactionRepository.save(transactionData);
  }

  async debitWallet(body: { amount: number }, id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["wallet"],
    });

    if (!user) {
      throw new HttpException("invalid user", HttpStatus.FORBIDDEN);
    }
    if (!user.wallet) {
      throw new HttpException(
        "please create your wallet first",
        HttpStatus.FORBIDDEN
      );
    }
    const walletAmount = user.wallet.balance - body.amount;
    if (body.amount < 0 || body.amount === 0 || walletAmount < 0)
      throw new HttpException("invalid amount", HttpStatus.BAD_REQUEST);

    const updatedAmount = (user.wallet.balance -= body.amount);
    await this.walletRepository.update(
      { id: user.wallet.id },
      { balance: updatedAmount }
    );

    await this.genTrnasction(id, body.amount);

    return await this.userRepository.findOne({
      where: { id },
      relations: ["wallet"],
    });
  }
  async fundWallet(body: { amount: number }, id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["wallet"],
    });

    if (!user) {
      throw new HttpException("invalid user", HttpStatus.FORBIDDEN);
    }
    if (!user.wallet) {
      throw new HttpException(
        "please create your wallet first",
        HttpStatus.FORBIDDEN
      );
    }
    if (body.amount < 0 || body.amount === 0)
      throw new HttpException("invalid amount", HttpStatus.BAD_REQUEST);
    const updatedAmount = (user.wallet.balance += body.amount);
    await this.walletRepository.update(
      { id: user.wallet.id },
      { balance: updatedAmount }
    );

    await this.genTrnasction(id, body.amount);

    return await this.userRepository.findOne({
      where: { id },
      relations: ["wallet"],
    });
  }
  async createWallet(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException("invalid user", HttpStatus.FORBIDDEN);
    }

    const wallet = await this.walletRepository.save({ user });
    if (!wallet)
      throw new HttpException(
        "an error occured while creating wallet",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
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

  async hello(id: string) {
    const userExists = await this.userRepository.findOne({
      where: { id },
      relations: {
        wallet: true,
      },
    });

    const allTransactions = await this.walletRepository.find({
      where: {
        id: userExists.wallet.id,
      },
      relations: {
        transaction: true,
      },
    });

    if (!userExists)
      throw new HttpException("invalid id", HttpStatus.BAD_REQUEST);

    return allTransactions;
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
