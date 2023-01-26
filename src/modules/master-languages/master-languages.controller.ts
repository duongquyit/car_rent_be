import { Controller, Get, Param } from '@nestjs/common';
import { MasterLanguagesService } from './master-languages.service';

@Controller('master-languages')
export class MasterLanguagesController {
  constructor(
    private readonly masterLanguagesService: MasterLanguagesService,
  ) {}
}
