import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Token } from './dto/token.dto';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Role } from 'src/constants/role.enum';
import { Store } from '../stores/model/store.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(inputSignupDto: SignupDto): Promise<User> {
    const { username, password } = inputSignupDto;

    const isUsernameExist = await this.userModel.exists({ username });
    if (isUsernameExist) throw new ConflictException('Username already exists');

    const user = this.userModel.create({
      ...inputSignupDto,
      username: username,
    });

    return user;
  }

  async login(inputLoginDto: LoginDto): Promise<Token> {
    const { username } = inputLoginDto;
    const user = await this.userModel.findOne({ username }).lean();

    const tokens = await this.getTokens(user);
    const updateRefreshToken = await this.updateRefreshTokenHash(user._id, tokens.refreshToken);

    return {
      username: user.username,
      role: user.role,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(id: Types.ObjectId, refreshToken: string): Promise<Token> {
    await this.userModel.findByIdAndUpdate(id, { refreshToken: null });

    return {
      accessToken: null,
      refreshToken,
    };
  }

  async refreshTokens(id: Types.ObjectId, refreshToken: string): Promise<Token> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) throw new ForbiddenException('Access Denied');
    if (!user.refreshToken) throw new ForbiddenException('Access Denied');

    const isRefreshTokenMatch = await bcrypt.compare(refreshToken, user?.refreshToken);
    if (!isRefreshTokenMatch) throw new ForbiddenException();

    const tokens = await this.getTokens(user);
    const updateRefreshToken = await this.updateRefreshTokenHash(id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshTokenHash(id: Types.ObjectId, refreshTokens: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshTokens, salt);

    await this.userModel.findByIdAndUpdate(id, { refreshToken: hashedRefreshToken });
  }

  async getTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          username: user.username,
          email: user.email,
          role: user.role,
        },
        {
          secret: 'SECRET',
          expiresIn: 60 * 60 * 24 ,
        },
      ),
      this.jwtService.signAsync(
        {
          username: user.username,
          email: user.email,
          role: user.role,
        },
        {
          secret: 'SECRET',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const confirmPassword = await bcrypt.compare(password, user.password);

    if (user && confirmPassword) {
      return user;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async createMerchant(createMerchantDto: CreateMerchantDto): Promise<User> {
    const { storeName, username, ...rest } = createMerchantDto;

    const isUsernameExist = await this.userModel.exists({ username });
    if (isUsernameExist) throw new ConflictException('Username already exists');

    const newUser = await this.userModel.create({
      ...rest,
      username,
      role: Role.Owner,
    });

    const isStoreNameExist = await this.storeModel.exists({ name: storeName });
    if (isStoreNameExist) throw new ConflictException('Store name already exists');

    const newStore = await this.storeModel.create({
      name: storeName,
      teamMembers: [newUser._id],
    });

    return newUser;
  }
}
