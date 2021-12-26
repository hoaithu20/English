import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/constants/user-role.enum';
import { Roles } from 'src/decoraters/role.decorator';
import { ApproveQuestionRequest } from 'src/requests/approve-question.request';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { AdminService } from 'src/services/admin.service';

@ApiTags('/api/auth')
@Controller('api/admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class AdminController {
    constructor( private readonly adminService: AdminService) {}

    @ApiBody({
        type: ApproveQuestionRequest
    })
    @Post('approve')
    async approveQuestion(request: ApproveQuestionRequest) {
        return await this.adminService.approveQuestion(request)
    }
}
