import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { Match } from "src/helpers/decorators.helpers";

export class createUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  password: string;

  @IsString()
  @Match("password")
  confirmPassword: string;

  @IsString()
  address: string;

  @IsString()
  name: string;
}
