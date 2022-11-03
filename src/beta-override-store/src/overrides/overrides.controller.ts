import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { OverridesService } from './overrides.service.js';
import { UploadOverride } from './upload-override.dto.js';

@Controller('overrides')
export class OverridesController {

  /**
   *
   */
  constructor(private dbService: OverridesService) {
    this.dbService.init();
  }

  @Get(['', 'all'])
  async findAllDb(): Promise<UploadOverride[]> {
    let data = await this.dbService.getAll();
    return data || [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UploadOverride> {
    let data = await this.dbService.getById(id);
    if (data) {
      return data;
    }
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: "The requested override was not found!"
    }, HttpStatus.NOT_FOUND);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async upload(@Body() uploadReq: UploadOverride, @Req() req): Promise<string> {
    console.log(`normalizing override owner to ${req.user.username}`);
    uploadReq.owner = req.user.username;
    await this.dbService.add(uploadReq);
    let count = await this.dbService.read();
    return count.toString();
  }
}