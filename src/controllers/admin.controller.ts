import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { UserRole } from 'src/constants/user-role.enum';
import { Roles } from 'src/decoraters/role.decorator';
import { Story } from 'src/repositories/entities/story.entity';
import { ApproveQuestionRequest } from 'src/requests/approve-question.request';
import { CreateStoryRequest } from 'src/requests/create-story.request';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { AdminService } from 'src/services/admin.service';
import { Connection } from 'typeorm';

@ApiTags('/api/admin')
@Controller('api/admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly connection: Connection,
  ) {}

  @ApiBody({
    type: ApproveQuestionRequest,
  })
  @Post('approve')
  async approveQuestion(@Body() request: ApproveQuestionRequest) {
    return await this.adminService.approveQuestion(request);
  }

  @ApiBody({
    type: CreateStoryRequest,
  })
  @Post('create-story')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio' },
      { name: 'image' },
    ]),
  )
  async createStory(
    @UploadedFiles()
    files: { audio?: Express.Multer.File; image?: Express.Multer.File },
    @Body() request: CreateStoryRequest,
  ) {
    try {
      const newStory = this.connection.manager.create(Story, {
        audio: files.audio[0].filename,
        img: files.image[0].filename,
        content: request.content,
        title: request.title,
      });
      await this.connection.manager.save(newStory);
    } catch (err) {
      throw new BadRequestException({
        code: ErrorCode.UNSUCCESS,
      });
    }
    console.log(files);
  }

  @ApiBody({
    type: CreateStoryRequest,
  })
  @Post('update-story')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio'},
      { name: 'image'},
    ]),
  )
  async updateStory(
    @UploadedFiles()
    files: { audio?: Express.Multer.File; image?: Express.Multer.File },
    @Body() request: CreateStoryRequest,
  ) {
    try {
      const story = await this.connection.manager.findOneOrFail(Story, {
        id: request.storyId,
      });
      if(files.audio[0].filename) story.audio=files.audio[0].filename;
      if(files.image[0].filename) story.img = files.image[0].filename;
      if(request.content) story.content = request.content;
      if(request.title) story.title = request.title; 
      await this.connection.manager.save(story);
    } catch (err) {
      throw new BadRequestException({
        code: ErrorCode.UNSUCCESS,
      });
    }
  }
}
