import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Token } from './dto/token.dto';
import { User } from './model/user.model';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RequestWithUser } from 'src/types/request-with-user';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/signup')
  async signup(@Body() inputSignupDto: SignupDto): Promise<User> {
    return await this.authService.signup(inputSignupDto);
  }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() inputLoginDto: LoginDto): Promise<Token> {
    return await this.authService.login(inputLoginDto);
  }

  @Post('auth/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req: RequestWithUser): Promise<Token> {
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    return this.authService.logout(req.user._id, refreshToken);
  }

  @Post('auth/refresh')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Owner)
  async refreshToken(@Request() req: RequestWithUser): Promise<Token> {
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    return this.authService.refreshTokens(req.user._id, refreshToken);
  }

  @Post('auth/createMerchant')
  async createMerchant(@Body() createMerchantDto: CreateMerchantDto): Promise<User> {
    return this.authService.createMerchant(createMerchantDto);
  }
}
