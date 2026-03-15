import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from 'src/common/dto/auth/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        private authRepository: AuthRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ access_token: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.authRepository.findByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username, sub: user._id };
            const access_token = this.jwtService.sign(payload);
            return { access_token };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}