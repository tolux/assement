import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminModule } from "src/admin/admin.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
    UsersModule,
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
