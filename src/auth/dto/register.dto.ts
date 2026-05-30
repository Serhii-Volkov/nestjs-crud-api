import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}