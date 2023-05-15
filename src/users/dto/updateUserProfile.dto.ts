import { IsString } from "class-validator";

export class UpdateUserProfileDto {
  @IsString()
  address: string;
}
