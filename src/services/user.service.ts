import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { UpdateProfileRequest } from 'src/requests/update-profile.request';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(userId: number) {
    const profile = await this.userRepository
    .createQueryBuilder('u')
    .select([
      'u.email as email',
      'u.username as username',
      'p.avatar as avatar',
      'p.dateOfBirth as dateOfBirth',
      'p.sex as sex'
    ])
    .leftJoin('u.profile', 'p')
    .where('u.id = :userId', {userId})
    .getRawOne();
    if(!profile) return;
    return profile;
  }

  async updateProfile(userId: number, request: UpdateProfileRequest) {
    
  }

  
}
