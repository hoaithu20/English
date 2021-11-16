import { EntityRepository, Repository } from 'typeorm';
import { Profile } from './entities/user-profile.entity';

@EntityRepository(Profile)
export class UserProfileRepository extends Repository<Profile> {}
