import { EntityRepository, Repository } from 'typeorm';
import { Week } from './entities/week.entity';

@EntityRepository(Week)
export class WeekRepository extends Repository<Week> {}
