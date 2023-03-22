import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService implements OnModuleInit {
  private jwtPrivateKey: string;
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: typeof UserEntity,
    private readonly configServoce: ConfigService,
  ) {}

  onModuleInit() {
    this.jwtPrivateKey = this.configServoce.get('auth.jwtSecret');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new UserEntity();
      user.email = createUserDto.email.trim().toLowerCase();
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;

      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);

      const userData = await user.save();

      // when registering then log user in automatically by returning a token
      const token = await this.signToken(userData);
      console.log('token', token);
      return new UserLoginResponseDto(userData, token);
    } catch (err) {
      if (err.constraint === 'uniq_user_email_key') {
        throw new HttpException(err.detail, HttpStatus.CONFLICT);
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const email = userLoginRequestDto.email;
    const password = userLoginRequestDto.password;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.signToken(user);
    return new UserLoginResponseDto(user, token);
  }

  async findAll() {
    const users = await this.usersRepository.find<UserEntity>();
    return users.map((user) => new UserDto(user));
  }

  async getUserEntity(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne<UserEntity>({
      where: { id },
    });
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async getUser(id: string): Promise<UserDto> {
    const user = await this.getUserEntity(id);
    return new UserDto(user);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne<UserEntity>({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    user.firstName = updateUserDto.firstName || user.firstName;
    user.lastName = updateUserDto.lastName || user.lastName;

    try {
      const data = await user.save();
      return new UserDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOne<UserEntity>({
      where: { id },
    });
    await user.remove();
    return new UserDto(user);
  }

  async signToken(user: UserEntity) {
    const payload: JwtPayload = {
      email: user.email,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
}
