import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { authHelpers } from "src/helpers/auth.helpers";
import { loginDto } from "./dto/login.dto";
import { createUserDto } from "./dto/createUser.dto";
import { AdminService } from "src/admin/admin.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private adminService: AdminService
  ) {}

  async login(data: loginDto) {
    const user = await this.usersService.findUserByEmail(data.email);
    if (
      !user ||
      !(await authHelpers.verifyPassword(data.password, user.password))
    )
      throw new HttpException(
        "invalid email or password",
        HttpStatus.BAD_REQUEST
      );

    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async adminLogin(data: loginDto) {
    const admin = await this.adminService.findAdminByEmail(data.email);
    if (
      !admin ||
      !(await authHelpers.verifyPassword(data.password, admin.password))
    )
      throw new HttpException(
        "invalid email or password",
        HttpStatus.BAD_REQUEST
      );

    const payload = {
      email: admin.email,
      id: admin.id,
      role: admin.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      admin: authHelpers.serializeAdmin(admin),
    };
  }

  async signup(data: createUserDto): Promise<boolean> {
    await this.usersService.createUser(data);
    return true;
  }
}
