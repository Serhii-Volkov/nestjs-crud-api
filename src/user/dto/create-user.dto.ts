import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsUrl, Matches } from "class-validator";

export class CreateUserDto {


    @IsEmail()
    @IsNotEmpty()
        email!: string


    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
        {message: 'Password must be at least 8 characters long and contain at least one letter and one number'}
    )
    @IsNotEmpty()
        password!: string


        //avatarUrl?: string
        //phoneNumber?: string

    @IsOptional()
    @IsArray()
    @IsUrl(
        {protocols: ['https'],
        host_whitelist: ['www.facebook.com', 'www.twitter.com', 'www.linkedin.com']}, 
        {message: 'Each social media URL must be a valid HTTPS URL from Facebook, Twitter, or LinkedIn',  each: true,}
    )
        socialMediaUrl?: string[]

        

}