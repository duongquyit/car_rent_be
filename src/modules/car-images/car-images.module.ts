import { Module } from '@nestjs/common';
import { CarImagesService } from './car-images.service';
import { CarImagesController } from './car-images.controller';

@Module({
  controllers: [CarImagesController],
  providers: [CarImagesService]
})
export class CarImagesModule {}
