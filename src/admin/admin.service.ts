import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./entities/admin.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { TransactionEntity } from "src/users/entities/transaction.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private userService: UsersService
  ) {}

  async findAdminByEmail(email: string): Promise<AdminEntity | undefined> {
    if (!email) return undefined;
    return await this.adminRepository.findOne({
      where: { email },
    });
  }

  async getAllTransaction() {
    return await this.transactionRepository.find({
      relations: ["wallet"],
    });
  }

  async allUser() {
    return await this.userService.allUsers();
  }
}
