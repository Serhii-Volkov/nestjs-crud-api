import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest{

    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'SecurePassword123'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: 'Пароль должен быть не менее 6 символов'})
    @MaxLength(128, {message: 'Пароль должен быть не более 128 символов'})
    password!: string;
}