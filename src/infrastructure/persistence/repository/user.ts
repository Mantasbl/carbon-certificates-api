import { EntityRepository, Repository } from 'typeorm';

import { UserRepository } from '../../../domain/capabilities/user-repository';
import { User } from '../../../domain/models/user';
import { User as UserEntity } from '../entity/user';
import { UserNotFoundError } from './../../../domain/exceptions/user-not-found';
@EntityRepository(UserEntity)
export class UserEntityManager extends Repository<UserEntity> implements UserRepository {
  async obtainUserByUsername(username: string): Promise<User> {
    const userQuery = this.createQueryBuilder('user').where('user.username = :username').setParameters({ username });

    const findResult = await userQuery.getOne();
    if (!findResult) {
      throw new UserNotFoundError();
    }
    return findResult as unknown as User;
  }
}
