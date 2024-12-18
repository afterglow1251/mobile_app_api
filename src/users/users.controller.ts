import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto, RegisterUserDto } from 'src/dto/user';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { omit } from 'lodash';
import { RequestWithUser } from 'src/_types/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerDto: RegisterUserDto) {
    const { email, password } = registerDto;
    return this.usersService.register(email, password);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    return this.usersService.login(email, password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    const user = await this.usersService.getUserById(userId);
    return omit(user, ['password']);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    const users = await this.usersService.getUsers();
    const usersWithoutPassword = users.map((user) => omit(user, ['password']));
    return usersWithoutPassword;
  }

  @Get('by-email')
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.usersService.getUserByEmail(email);
    return omit(user, ['password']);
  }
}
