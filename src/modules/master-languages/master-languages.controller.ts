import { Controller, Get } from '@nestjs/common';
import { MasterLanguagesService } from './master-languages.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Master Language')
@Controller('master-languages')
export class MasterLanguagesController {
  constructor(
    private readonly masterLanguagesService: MasterLanguagesService,
  ) {}

  @Get()
  async getAll() {
    return await this.masterLanguagesService.getAll();
  }
}
