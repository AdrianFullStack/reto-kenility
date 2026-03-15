import { IsString, MinLength, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
    @IsString({ message: 'El nombre de usuario debe ser texto' })
    @MinLength(4, { message: 'El nombre de usuario debe tener al menos 4 caracteres' })
    @MaxLength(20, { message: 'El nombre de usuario debe tener máximo 20 caracteres' })
    username: string;

    @IsString({ message: 'La contraseña debe ser texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(20, { message: 'La contraseña debe tener máximo 20 caracteres' })
    password: string;
}