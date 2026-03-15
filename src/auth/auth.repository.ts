import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/schemas/user.schema';
import { AuthCredentialsDto } from 'src/common/dto/auth/auth-credentials.dto';

@Injectable()
export class AuthRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new this.userModel({ username, password: hashedPassword });

        try {
            await user.save();
        } catch (error) {
            if (error.code === 11000) { // Error de duplicado en Mongo
                throw new ConflictException('Username already exists');
            }
            throw new InternalServerErrorException('Error al crear el usuario');
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }
}
