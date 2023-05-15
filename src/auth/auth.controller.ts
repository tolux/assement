import { Controller, Post, Body, HttpStatus } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { createUserDto } from "./dto/createUser.dto";
import { loginDto } from "./dto/login.dto";
import { _handleError } from "src/helpers/error.helpers";
import { Public } from "src/constants/auth.public";

@Public()
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  // remeber otp implementation => change it to be in use table
  @Post("/login")
  async login(@Body() body: loginDto) {
    try {
      const data = await this.authService.login(body);
      return { data, status: HttpStatus.OK, message: "login successful" };
    } catch (error) {
      _handleError(error);
    }
  }

  @Post("/sign-up")
  async signup(@Body() body: createUserDto) {
    try {
      await this.authService.signup(body);
      return {
        status: HttpStatus.OK,
        message: "your account has been created ",
      };
    } catch (error) {
      _handleError(error);
    }
  }

  @Post("/admin-login")
  async adminLogin(@Body() body: loginDto) {
    try {
      const data = await this.authService.adminLogin(body);
      return { data, status: HttpStatus.OK, message: "login successful" };
    } catch (error) {
      _handleError(error);
    }
  }
}
