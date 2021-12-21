import { EntityRepository, Repository } from "typeorm";
import { Package } from "./entities/package.entity";

@EntityRepository(Package)
export class PackageRepository extends Repository<Package> {}