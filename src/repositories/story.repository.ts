import { EntityRepository, Repository } from 'typeorm';
import { Story } from './entities/story.entity';

@EntityRepository(Story)
export class StoryRepository extends Repository<Story> {}
