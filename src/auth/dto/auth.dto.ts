import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
    @ApiProperty({
        description: "JWT access token",
        example: 'eyJhbGciJTYzI1NiIsInR5cCI6IkpXVCJ9..'
    })
   accessToken!: string; 
}