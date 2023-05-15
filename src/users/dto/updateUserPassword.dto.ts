import { IsString, Matches, MinLength } from 'class-validator';
import { Match } from 'src/helpers/decorators.helpers';

export class updateUserPasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @Match('password')
  confirmPassword: string;
}
