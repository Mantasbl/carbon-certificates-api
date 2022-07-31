import { JwtPayload } from '../types/auth';

export interface AuthService {
  generateJwt(payload: JwtPayload): Promise<string>;

  validateUser(username: string, password: string): Promise<void>;
}
