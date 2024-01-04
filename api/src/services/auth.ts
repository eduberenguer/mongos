import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export type PayloadToken = {
  id: string;
  userName: string;
} & jwt.JwtPayload;

const secret = 'test';

export class AuthServices {
  private static salt = 10;

  static createJWT(payload: PayloadToken) {
    const token = jwt.sign(payload, secret!);
    return token;
  }

  static verifyJWTGettingPayload(token: string) {
    try {
      const result = jwt.verify(token, secret!);
      if (typeof result === 'string') {
        throw new Error('Invalid Token');
      }

      return result as PayloadToken;
    } catch (error) {
      throw new Error('Invalid Token');
    }
  }

  static hash(value: string) {
    return hash(value, AuthServices.salt);
  }

  static compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
