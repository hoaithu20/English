import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { request } from 'express';
import { CurrUser } from 'src/decoraters/user.decorator';
import { User } from 'src/repositories/entities/user.entity';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
import { PagingRequest } from 'src/requests/paging.request';
import { DoPackageRequest } from 'src/requests/todo-package.request';
import { PaginateResult } from 'src/responses/PaginateResult';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { PackagesService } from 'src/services/packages.service';

@Controller('packages')
export class PackagesController {
  constructor( private readonly packageService: PackagesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: GetDetailPackageRequest,
  })
  @Get('get-detail-package')
  async getDetailPackage(@Body() request: GetDetailPackageRequest) {
    const [data, count] = await this.packageService.getDetailPackage(request)
    return PaginateResult.init(data, count);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreatePackageRequest
  })
  @Post('create-package')
  async createPackage(@CurrUser() user: User, @Body() request: CreatePackageRequest) {
    return this.packageService.createPackage(user.id, request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: DoPackageRequest,
  })
  @Post('do-package')
  async doPackage(@CurrUser() user: User, @Body() request: DoPackageRequest) {
    return await this.packageService.todoPackage(user.id, request)
  }

 @UseGuards(JwtAuthGuard)
  @Post('get-history')
  async getHistory(@CurrUser() user: User, @Body() request: PagingRequest) {
    const [data, count] = await this.packageService.getHistory(user.id, request)
    return PaginateResult.init(data, count);
 }

 @UseGuards(JwtAuthGuard)
 @Post('get-detail-package-history')
 async getDetail(@CurrUser()user: User, @Body() request: {packageId: number }) {
   return await this.packageService.getDetailPackageHistory(user.id, request.packageId)
 }

}