import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { OverridesModule } from './overrides/overrides.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { DiscordAuthModule } from './discord/discord.module.js';
import { StaticModule } from './static.module.js';

@Module({
  imports: [
    OverridesModule, 
    DiscordAuthModule,
    AuthModule,
    StaticModule,
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
