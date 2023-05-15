import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./entities/admin.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AdminService {
  constructor(
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

  async allUser() {
    return await this.userService.allUsers();
  }
}
