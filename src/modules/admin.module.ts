import { Module } from '@nestjs/common';
import { AdminController } from 'src/controllers/admin.controller';
import { AdminService } from 'src/services/admin.service';

@Module({
    providers: [AdminService],
    controllers: [AdminController],
    exports: [AdminService]
})
export class AdminModule {

}
