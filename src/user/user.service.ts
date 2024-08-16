import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQuery } from '@/config/pagination.query';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async findAll(getUsers: PaginationQuery) {
    const user = await lastValueFrom(
      this.userClient.send('get_all_users', getUsers),
    );
    return user;
  }

  findOne(id: string) {
    return this.userClient.send('get_user_by_id', { id });
  }

  remove(id: string) {
    return { message: 'user deleted' };
    // return this.userClient
  }
}
