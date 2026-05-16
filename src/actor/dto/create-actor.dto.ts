import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateActorDto {
    @Transform(({ value }) => value.trim())

    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name must be a string'})
    @MinLength(3, {message: 'Name must be at least 3 characters'})
    @Matches(/^(?=.*[\p{L}])[\p{L}\s-]+$/u, {
        message: 'Name contains invalid characters',
    })


    name!: string
}