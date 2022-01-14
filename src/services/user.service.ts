import { Injectable } from '@nestjs/common';
import { QuestionStatus } from 'src/constants/question-status.enum';
import { StoryRepository } from 'src/repositories/story.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { GetDetailStory } from 'src/requests/get-detail-story.request';
import { PagingRequest } from 'src/requests/paging.request';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly storyRepo: StoryRepository,
  ) {}

  async getProfile(userId: number) {
    const profile = await this.userRepository
      .createQueryBuilder('u')
      .select([
        'u.id as id',
        'u.role as role',
        'u.email as email',
        'u.username as username',
        'p.avatar as avatar',
        'p.dateOfBirth as dateOfBirth',
        'p.sex as sex',
      ])
      .leftJoin('u.profile', 'p')
      .where('u.id = :userId', { userId })
      .getRawOne();
    if (!profile) return;
    return profile;
  }

  async getListStory(request: PagingRequest) {
    const size = request.pageSize || 5;
    const index = request.pageIndex || 1;
    const query = this.storyRepo
      .createQueryBuilder()
      .where('status = :status', { status: QuestionStatus.ACTIVE })
      .offset((index - 1) * size)
      .limit(size);
    const [stories, count] = await Promise.all([
      query.getMany(),
      query.getCount(),
    ]);

    return [
      stories.map((i) => ({
        content: i.content,
        audio: i.audio,
        background: i.img,
      })),
      count,
    ];
  }

  async getDetailStory(request: GetDetailStory) {
    const story = await this.storyRepo.findOneOrFail({ id: request.storyId });
    return {
      content: story.content,
      audio: story.audio,
      background: story.img,
    };
  }
}
