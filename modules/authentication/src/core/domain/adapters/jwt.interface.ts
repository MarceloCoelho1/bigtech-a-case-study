import { User } from "../entities/User";

export interface IJwtService {
    sign(payload: IJwtServicePayload, expiresIn?: string | number): string;
    verify(token: string): IJwtServicePayload | null;
    resetToken(id: string): string;
}

export interface IJwtServicePayload {
    userId: string;
}

export interface JWTConfig {
    secret: string;
    expiresIn: string;
}