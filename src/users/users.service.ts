import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { BCRYPT_SALT_ROUNDS } from 'src/constants/auth.constants';
import { User } from 'src/entities/user.entity';
import { CustomHttpException } from 'src/errors/custom-http.exception';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new CustomHttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new CustomHttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new CustomHttpException(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new CustomHttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
