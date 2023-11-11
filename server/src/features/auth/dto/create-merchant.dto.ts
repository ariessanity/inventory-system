import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMerchantDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  storeName: string;
}
