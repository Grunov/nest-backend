import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(
    @Body() userDto: CreateUserDto,
    @Response() res,
  ) {
    return this.authService.registration(userDto);
  }

  @Post('/check-auth')
  checkAuth(@Body() data: any) {
    return this.authService.checkAuth(data.token);
  }
}
