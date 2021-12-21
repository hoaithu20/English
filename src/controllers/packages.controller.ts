import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CurrUser } from 'src/decoraters/user.decorator';
import { User } from 'src/repositories/entities/user.entity';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
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
  async getDetailPackage(request: GetDetailPackageRequest) {
    const [data, count] = await this.packageService.getDetailPackage(request)
    return PaginateResult.init(data, count);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreatePackageRequest
  })
  @Post('create-package')
  async createPackage(@CurrUser() user: User, request: CreatePackageRequest) {
    return this.packageService.createPackage(user.id, request);
  }
}
