import {
  Controller,
  Put,
  Request,
  Body,
  HttpStatus,
  Post,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { _handleError } from "src/helpers/error.helpers";
import { updateUserPasswordDto } from "./dto/updateUserPassword.dto";
import { UpdateUserProfileDto } from "./dto/updateUserProfile.dto";
import { TQuery } from "src/@types/app.types";

@Controller("user")
export class UserController {
  constructor(private usersService: UsersService) {}

  @Put("/wallet")
  async createWallet(@Request() req: any) {
    try {
      const id = req["user"];
      const data = await this.usersService.createWallet(id);
      return { data, status: HttpStatus.OK, message: "wallet updated" };
    } catch (error) {
      _handleError(error);
    }
  }

  @Post("/debit-wallet")
  async debitWallet(@Body() body: { amount: number }, @Request() req: any) {
    try {
      const id = req["user"];
      const data = await this.usersService.debitWallet(body, id);
      return { data, status: HttpStatus.OK, message: "wallet debited" };
    } catch (error) {
      _handleError(error);
    }
  }
  @Post("/fund-wallet")
  async fundWallet(@Body() body: { amount: number }, @Request() req: any) {
    try {
      const id = req["user"];
      const data = await this.usersService.fundWallet(body, id);
      return { data, status: HttpStatus.OK, message: "wallet funded" };
    } catch (error) {
      _handleError(error);
    }
  }
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
  @Get("/get-all-transaction")
  async getAllTransactions(
    @Query() query: TQuery,

    @Request() req: any
  ) {
    try {
      const id = req["user"];
      const data = await this.usersService.getAllTransactions(query, id);

      return { data, status: HttpStatus.OK };
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
