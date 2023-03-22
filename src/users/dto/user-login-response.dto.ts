import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserLoginResponseDto extends UserDto {
  @ApiProperty()
  token: string;

  constructor(user: UserEntity, token?: string) {
    super(user);
    this.token = token;
  }
}
