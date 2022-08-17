import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

@Module({

    imports: [
        ServeStaticModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<ServeStaticModuleOptions[]> => ([{
                rootPath: join(dirname(fileURLToPath(import.meta.url)), ...configService.get<string>('SPA_BUILD_PATH', '../../beta-override-gallery/dist').split('/'))
            }])
        })]
})
export class StaticModule { }