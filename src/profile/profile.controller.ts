import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  // Protected route: return profile details of the authenticated user
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@Request() req: any): any {
    return req.user;
  }
}