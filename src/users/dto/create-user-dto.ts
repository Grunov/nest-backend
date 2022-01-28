import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    example: 'example@example.com',
    description: 'Email of user'
  })
  readonly email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password of user'
  })
  readonly password: string;

}