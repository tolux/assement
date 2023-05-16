import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class createTransactionDto {
  @IsString()
  expiration: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  ref: string;
}
