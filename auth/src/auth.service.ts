import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,

        private readonly jwtService: JwtService,
    ) {}

    public async validateUser(id: string, password: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

        const user = await this.userModel.findById(id);

        if (!user) {
            return null;
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    public async createUser(password: string) {
        const hashedPassword = await argon2.hash(password);

        return this.userModel.create({
            password: hashedPassword,
        });
    }

    public createToken(id: string) {
        return this.jwtService.sign({ id }, { expiresIn: process.env.JWT_LIFETIME });
    }
}
