import { Module } from '@nestjs/common';
import { OverridesController } from './overrides.controller.js';
import { OverridesService } from './overrides.service.js';

@Module({
    controllers: [OverridesController],
    providers: [OverridesService],
    exports: [OverridesService]
})
export class OverridesModule {}
