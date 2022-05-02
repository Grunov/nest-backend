import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserModel } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return {
      user,
      token: this.generateToken(user),
    };
  }

  async registration(userDto: CreateUserDto) {
    const candidat = await this.userService.getUserByEmail(userDto.email);
    if (candidat) {
      throw new HttpException(
        `User with email ${userDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async checkAuth(token: string) {
    const user = await this.validateAccessToken(token);
    return {
      user,
      token: this.generateToken(user),
    };
  }

  private generateToken(user: UserModel) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '24h'
    });
  }

  private generateTokens(user: UserModel) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '24h'
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '24h'
    });
    return {
      accessToken,
      refreshToken
    }
  }

  private async validateAccessToken(token: string) {
    return this.jwtService.verify(token);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Email or password incorrect' });
  }
}
