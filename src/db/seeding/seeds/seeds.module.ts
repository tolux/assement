import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedsService } from "./seeds.service";

import { AdminEntity } from "src/admin/entities/admin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [],
  providers: [SeedsService],
})
export class SeedsModule {}
