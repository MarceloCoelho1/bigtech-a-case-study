// src/infra/adapters/JWTService.ts
import jwt from 'jsonwebtoken';
import { IJwtService, IJwtServicePayload } from '../../core/domain/adapters/jwt.interface';
import { JWTConfig } from '../../core/domain/adapters/jwt.interface';

export class JWTService implements IJwtService {
    private secret: string;
    private expiresIn: string;

    constructor(config: JWTConfig) {
        this.secret = config.secret;
        this.expiresIn = config.expiresIn;
    }

    sign(payload: IJwtServicePayload, expiresIn?: string | number): string {
        return jwt.sign(payload, this.secret, { expiresIn: expiresIn || this.expiresIn });
    }

    verify(token: string): IJwtServicePayload | null {
        try {
            return jwt.verify(token, this.secret) as IJwtServicePayload;
        } catch (error) {
            return null;
        }
    }

    resetToken(id: string): string {
        const expiresIn = this.expiresIn
        const resetToken = this.sign({ userId: id }, expiresIn)

        return resetToken
    }

}
