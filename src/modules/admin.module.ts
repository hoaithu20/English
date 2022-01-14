import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { AdminController } from 'src/controllers/admin.controller';
import { StoryRepository } from 'src/repositories/story.repository';
import { AdminService } from 'src/services/admin.service';
import { Helper } from 'src/utils/helper';

@Module({
    imports: [
        TypeOrmModule.forFeature([StoryRepository]),
        MulterModule.registerAsync({
            useFactory: () => ({
                storage: diskStorage({
                    filename: Helper.customFileName,
                    destination: './upload',
                }),
            }),
        }),
    ],
    providers: [AdminService],
    controllers: [AdminController],
    exports: [AdminService]
})
export class AdminModule {

}
