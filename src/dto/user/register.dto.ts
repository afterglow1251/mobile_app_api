import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  password: string;
}
