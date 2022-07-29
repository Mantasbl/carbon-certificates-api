import { User } from '../models/user';

export interface UserRepository {
  obtainUserByUsername(username: string): Promise<User>;
}
