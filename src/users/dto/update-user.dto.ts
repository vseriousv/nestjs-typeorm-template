import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastName?: string;
}
