import {
  Controller,
  Put,
  Request,
  Body,
  HttpStatus,
  Post,
  Get,
  Param,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { _handleError } from "src/helpers/error.helpers";
import { updateUserPasswordDto } from "./dto/updateUserPassword.dto";
import { UpdateUserProfileDto } from "./dto/updateUserProfile.dto";

@Controller("user")
export class UserController {
  constructor(private usersService: UsersService) {}

  @Put("/update")
  async updateUserProfile(
    @Body() body: UpdateUserProfileDto,
    @Request() req: any
  ) {
    try {
      const id = req["user"];
      const data = await this.usersService.updateUser({ ...body, id });
      return { data, status: HttpStatus.OK, message: "profile updated" };
    } catch (error) {
      _handleError(error);
    }
  }
  @Get("/hello")
  async hello(@Request() req: any) {
    try {
      const id = req["user"];
      const data = await this.usersService.hello(id);
      return { data, status: HttpStatus.OK };
    } catch (error) {
      _handleError(error);
    }
  }
}
