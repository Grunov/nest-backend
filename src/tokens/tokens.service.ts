import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/users/users.model';
import TokensModel from './tokens.model';

@Injectable()
export class TokensService {

    constructor(
        @InjectModel(TokensModel)
        private tokensRepository: typeof TokensModel,
        private jwtService: JwtService
    ) { }

    generate(user: UserModel) {
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
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    validate(token: string, type: string) {
        let secret;
        if(type === 'access') secret = process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET';
        if(type === 'refresh') secret = process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET';
        try {
            const userData = this.jwtService.verify(token, {secret: secret});
            return userData;
        }
        catch(error) {
            console.log(error);
            return null;
        }
    }

    async save(token: string, userId: number) {
        const tokenData = this.tokensRepository.create({value: token, userId: userId})
        return tokenData;
    }

    remove() {

    }

    find() {

    }

}
