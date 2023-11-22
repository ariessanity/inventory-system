import { Body, Controller, Post, UseGuards, Get, Put, Delete, Param, Req, Query } from '@nestjs/common';
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
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

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
  async logout(@Req() req: RequestWithUser): Promise<Token> {
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    return this.authService.logout(req.user._id, refreshToken);
  }

  @Get('auth/getAllUser')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  getAllUser(@Req() req: RequestWithUser, @Query() query: Request['query']) {
    return this.authService.getAllUser(req.user._id, query);
  }

  @Put('auth/updateUser/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  updateUser(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete('auth/deleteUser/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  deleteUser(@Param('id') id: ObjectId) {
    return this.authService.deleteUser(id);
  }

  @Post('auth/refresh')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  async refreshToken(@Req() req: RequestWithUser): Promise<Token> {
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    return this.authService.refreshTokens(req.user._id, refreshToken);
  }
}
