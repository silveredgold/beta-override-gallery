
import { Controller, Get, Req, Res, UseGuards, Request } from '@nestjs/common';
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service.js';
import { DiscordAuthGuard } from './discord.guard.js';

@Controller('auth/discord')
export class DiscordOauthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(DiscordAuthGuard)
  @Get()
  async login(@Request() req) {
    console.log('hit login ', JSON.stringify(req.user));
    return this.authService.login(req.user);
  }

  @Get('callback')
  @UseGuards(DiscordAuthGuard)
  async loginCallback(@Request() req, @Res() res: Response) {
    console.log('hit callback!', JSON.stringify(req.user));
    const {accessToken } = this.authService.login(req.user);
    res.cookie('jwt', accessToken);
    res.redirect('/');
  }
}