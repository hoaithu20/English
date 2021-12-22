import { User } from 'src/repositories/entities/user.entity';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
import { PagingRequest } from 'src/requests/paging.request';
import { DoPackageRequest } from 'src/requests/todo-package.request';
import { PaginateResult } from 'src/responses/PaginateResult';
import { PackagesService } from 'src/services/packages.service';
export declare class PackagesController {
    private readonly packageService;
    constructor(packageService: PackagesService);
    getDetailPackage(request: GetDetailPackageRequest): Promise<PaginateResult<unknown>>;
    createPackage(user: User, request: CreatePackageRequest): Promise<void>;
    doPackage(user: User, request: DoPackageRequest): Promise<any[]>;
    getHistory(user: User, request: PagingRequest): Promise<PaginateResult<unknown>>;
    getDetail(user: User, request: {
        packageId: number;
    }): Promise<{
        totalDo: number;
        maxPoint: string;
        averagePoint: number;
        items: {
            time: number;
            point: string;
            createAt: Date;
            namePackage: string;
        }[];
    }>;
}
