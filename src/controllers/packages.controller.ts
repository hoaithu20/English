import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrUser } from 'src/decoraters/user.decorator';
import { User } from 'src/repositories/entities/user.entity';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { GetDetailHistoryRequest } from 'src/requests/get-detail-history.rquest';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
import { GetLeaderBoardRequest } from 'src/requests/get-leaderboard.request';
import { PagingRequest } from 'src/requests/paging.request';
import { DoPackageRequest } from 'src/requests/todo-package.request';
import { PaginateResult } from 'src/responses/PaginateResult';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { PackagesService } from 'src/services/packages.service';

@ApiTags('/api/package')
@Controller('api/package')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PackagesController {
  constructor(private readonly packageService: PackagesService) {}

  @ApiBody({
    type: PagingRequest,
  })
  @Post('all-package')
  async getAllPackage(@Body() request: PagingRequest) {
    const [data, count] = await this.packageService.getAllPackage(request);
    return PaginateResult.init(data, count);
  }

  @ApiBody({
    type: GetDetailPackageRequest,
  })
  @Post('get-detail-package')
  async getDetailPackage(@Body() request: GetDetailPackageRequest) {
    const [data, count] = await this.packageService.getDetailPackage(request);
    return PaginateResult.init(data, count);
  }

  @ApiBody({
    type: CreatePackageRequest,
  })
  @Post('create-package')
  async createPackage(
    @CurrUser() user: User,
    @Body() request: CreatePackageRequest,
  ) {
    console.log(user)
    return this.packageService.createPackage(user.id, request);
  }

  @ApiBody({
    type: DoPackageRequest,
  })
  @Post('do-package')
  async doPackage(@CurrUser() user: User, @Body() request: DoPackageRequest) {
    return await this.packageService.todoPackage(user.id, request);
  }

  @Post('get-history')
  async getHistory(@CurrUser() user: User, @Body() request: PagingRequest) {
    const [data, count] = await this.packageService.getHistory(
      user.id,
      request,
    );
    return PaginateResult.init(data, count);
  }

  @Post('get-detail-package-history')
  async getDetail(
    @CurrUser() user: User,
    @Body() request: { packageId: number },
  ) {
    return await this.packageService.getDetailPackageHistory(
      user.id,
      request.packageId,
    );
  }

  @ApiBody({
    type: GetDetailHistoryRequest
  })
  @Post('get-detail-history')
  async getDetailHistory(
    @CurrUser() user: User,
    @Body() request: GetDetailHistoryRequest,
  ) {
    return await this.packageService.getDetailHistory(
      user.id,
      request,
    );
  }

  @Post('leaderboard')
  async getLeaderBoard(
    @Body() request: GetLeaderBoardRequest,
  ) {
    return await this.packageService.getLeaderBoard(request);
  }
}
