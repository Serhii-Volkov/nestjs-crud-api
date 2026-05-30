import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export class LoginRequest{

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: 'Пароль должен быть не менее 6 символов'})
    @MaxLength(128, {message: 'Пароль должен быть не более 128 символов'})
    password!: string;
}