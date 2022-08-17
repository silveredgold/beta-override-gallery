import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OverridesModule } from './overrides/overrides.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service.js';
import { DiscordAuthModule } from './discord/discord.module.js';

@Module({
  imports: [
    OverridesModule, 
    DiscordAuthModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    ServeStaticModule.forRoot({ // New
      rootPath: join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'beta-override-gallery/dist'), // New
    }), AuthModule, UsersModule, // New
  ],
  controllers: [AppController]
})
export class AppModule {}
