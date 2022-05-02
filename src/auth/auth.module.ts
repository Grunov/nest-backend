import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import TokensModel from './tokens.model';
import UserTokensModel from './user-tokens.model';

console.log(process.env.ACCESS_TOKEN_EXPIRATION)


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    SequelizeModule.forFeature([
      TokensModel,
      UserTokensModel
    ])
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
