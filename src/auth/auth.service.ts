import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = this.tokensService.generate(user);
    const refreshToken = await this.tokensService.save(tokens.refreshToken, user.id);
    if(!refreshToken) {
      throw new HttpException(
        `Проблема авторизации`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
    return {
      user,
      tokens
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
    const tokens = this.tokensService.generate(user);
    const refreshToken = await this.tokensService.save(tokens.refreshToken, user.id);
    if(!refreshToken) {
      throw new HttpException(
        `Проблема авторизации`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
    return {
      user,
      tokens
    };
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
