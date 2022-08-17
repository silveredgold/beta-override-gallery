import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { DiscordOauthController } from "./auth-discord.controller.js";
import { DiscordStrategy } from "./discord.strategy.js";

@Module({
  imports: [AuthModule],
  controllers: [DiscordOauthController],
  providers: [DiscordStrategy],
})
export class DiscordAuthModule {}