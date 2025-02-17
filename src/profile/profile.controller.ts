import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  // Protected route: return profile details of the authenticated user
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@Request() req: Req) {
    return req.user;
  }
}
