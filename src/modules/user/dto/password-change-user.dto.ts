import { IsEmail, IsString, MinLength } from 'class-validator';

export class PasswordChangeUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  oldPassword: string;

  @IsString()
  @MinLength(5)
  newPassword: string;
}
