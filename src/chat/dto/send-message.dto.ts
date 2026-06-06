import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class SendMessageDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(1000)
    message!: string
}