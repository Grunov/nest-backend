import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() userDto: CreateUserDto,
    @Res({passthrough: true}) response
  ) {
    const authData = await this.authService.login(userDto);
    response.cookie('refreshToken', authData.tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      httpOnly: true
    });
    return {
      user: authData.user,
      accessToken: authData.tokens.accessToken
    }
  }

  @Post('/registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({passthrough: true}) response
  ) {
    const authData = await this.authService.registration(userDto);
    response.cookie('refreshToken', authData.tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      httpOnly: true
    });
    return {
      user: authData.user,
      accessToken: authData.tokens.accessToken
    }
  }
}
