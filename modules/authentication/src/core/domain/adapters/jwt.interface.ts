export interface IJwtService {
    sign(payload: IJwtServicePayload, expiresIn?: string | number): string;
    verify(token: string): IJwtServicePayload | null;
}

export interface IJwtServicePayload {
    userId: string;
}

export interface JWTConfig {
    secret: string;
    expiresIn: string;
}