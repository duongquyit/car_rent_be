import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { UpdateCarImageDto } from 'src/modules/car-images/dto/update-car-image.dto';
import { UpdateCarLocationDto } from 'src/modules/car-locations/dto/update-car-location.dto';
import { UpdateCarTranslationDto } from 'src/modules/car-translations/dto/update-car-translation.dto';
import { UpdateCarTypeDto } from 'src/modules/car-types/dto/update-car-type.dto';

export class UpdateCarDto {
  @ApiProperty({ type: [UpdateCarTranslationDto] })
  @Type(() => UpdateCarTranslationDto)
  @IsOptional()
  car_translation?: UpdateCarTranslationDto[];

  @ApiProperty({ type: [UpdateCarTypeDto] })
  @Type(() => UpdateCarTypeDto)
  car_types?: UpdateCarTypeDto[];

  @ApiProperty({ type: [UpdateCarLocationDto] })
  @Type(() => UpdateCarLocationDto)
  car_locations?: UpdateCarLocationDto[];

  @ApiProperty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsNumber()
  gasoline: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  base_price: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  image_thumbnail: string;

  @ApiProperty({ type: [UpdateCarImageDto] })
  @Type(() => UpdateCarImageDto)
  images: UpdateCarImageDto[];
}
