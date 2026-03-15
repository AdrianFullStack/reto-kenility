import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from 'src/common/dto/auth/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ access_token: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}