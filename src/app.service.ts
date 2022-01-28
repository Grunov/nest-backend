import { Injectable } from '@nestjs/common';
import { IUser } from './types';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to pp api';
  }
}
