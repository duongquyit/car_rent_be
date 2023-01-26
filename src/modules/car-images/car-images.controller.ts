import { Controller, Get, Param } from '@nestjs/common';
import { CarImagesService } from './car-images.service';

@Controller('car-images')
export class CarImagesController {
  constructor(private readonly carImagesService: CarImagesService) {}
}
