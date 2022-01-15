import { EntityRepository, Repository } from 'typeorm';
import { Dictionary } from './entities/dictionary.entity';

@EntityRepository(Dictionary)
export class PackageRepository extends Repository<Dictionary> {}
