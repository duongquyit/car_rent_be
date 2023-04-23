import { Module } from '@nestjs/common';
import { CarImagesService } from './car-images.service';
import { CarImagesController } from './car-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarImage } from './entities/car-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarImage])],
  controllers: [CarImagesController],
  providers: [CarImagesService],
})
export class CarImagesModule {}
