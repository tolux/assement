import {
  Controller,
  Param,
  Delete,
  HttpStatus,
  Put,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminGuard } from "src/guard/admin.guard";
import { _handleError } from "src/helpers/error.helpers";
import { authHelpers } from "src/helpers/auth.helpers";

@UseGuards(AdminGuard)
@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("/all-users")
  async updateUserProfile(@Request() req: any) {
    try {
      const data = await this.adminService.allUser();
      return { data, status: HttpStatus.OK };
    } catch (error) {
      _handleError(error);
    }
  }
}
