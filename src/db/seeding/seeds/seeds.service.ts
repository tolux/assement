import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AdminEntity } from "src/admin/entities/admin.entity";
import { default_admin } from "../data/admin.data";

@Injectable()
export class SeedsService implements OnModuleInit {
  logger = new Logger(SeedsService.name);
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  async seedAdmin() {
    try {
      this.logger.log("seeding  admin");

      const admin = await this.adminRepository.findOne({
        where: { email: default_admin.email },
      });
      if (!admin) {
        await this.adminRepository.save(default_admin);
      }

      this.logger.log("done seeding  admin");
    } catch (error) {
      this.logger.log(error);
    }
  }
}
