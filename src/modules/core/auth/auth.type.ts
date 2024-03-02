export interface AuthServiceInterface {
    hashPassword(password: string): string;
    comparePassword(password: string, hash: string): boolean;
    generateToken(secret: string, payload: any): string;
    verifyToken(secret: string, token: string): any | null;
}