import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';
import { Role } from 'src/constants/role.enum';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: string;

  @IsOptional()
  @IsPhoneNumber('PH', { message: 'Contact number must be a valid phone number' })
  mobileNumber: string;
}
