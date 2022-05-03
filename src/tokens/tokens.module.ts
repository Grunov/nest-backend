import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import TokensModel from './tokens.model';
import { TokensService } from './tokens.service';

@Module({
  providers: [TokensService],
  imports: [
    SequelizeModule.forFeature([
      TokensModel
    ]),
    JwtModule.register({})
  ],
  exports: [
    TokensService, 
    JwtModule
  ]
})
export class TokensModule {}
