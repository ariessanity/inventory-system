import { IsOptional, IsString } from 'class-validator';

export class Token {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  refreshToken: string;
}
