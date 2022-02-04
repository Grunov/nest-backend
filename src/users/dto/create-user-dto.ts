import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Email of user',
  })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password of user',
  })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Not less than 4 and not more than 6 characters' })
  readonly password: string;
}
