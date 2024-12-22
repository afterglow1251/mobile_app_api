import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Query,
  HttpStatus,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto, RegisterUserDto } from 'src/dto/user';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { omit } from 'lodash';
import { RequestWithUser } from 'src/_types/user';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { accessToken } from 'src/constants/swagger.constants';

@Controller('users')
@ApiBearerAuth(accessToken)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    const { email, password } = registerDto;
    return this.usersService.register(email, password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
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

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;

    const updatedUser = await this.usersService.updateUser(
      userId,
      updateUserDto,
    );
    return omit(updatedUser, ['password']);
  }
}
