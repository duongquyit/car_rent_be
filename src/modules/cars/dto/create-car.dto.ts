import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreateCarImageDto } from 'src/modules/car-images/dto/create-car-image.dto';
import { CreateCarLocationDto } from 'src/modules/car-locations/dto/create-car-location.dto';
import { CreateCarTranslationDto } from 'src/modules/car-translations/dto/create-car-translation.dto';
import { CreateCarTypeDto } from 'src/modules/car-types/dto/create-car-type.dto';

export class CreateCarDto {
  @ApiProperty({ type: [CreateCarTranslationDto] })
  @Type(() => CreateCarTranslationDto)
  @ArrayMinSize(1)
  @ValidateNested()
  car_translation: CreateCarTranslationDto[];

  @ApiProperty({ type: [CreateCarTypeDto] })
  @Type(() => CreateCarTypeDto)
  @ArrayMinSize(1)
  @ValidateNested()
  car_types: CreateCarTypeDto[];

  @ApiProperty({ type: [CreateCarLocationDto] })
  @Type(() => CreateCarLocationDto)
  @ArrayMinSize(1)
  @ValidateNested()
  car_locations: CreateCarLocationDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  gasoline: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  base_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  image_thumbnail: string;

  @ApiProperty({ type: [CreateCarImageDto] })
  @Type(() => CreateCarImageDto)
  @ArrayMinSize(1)
  @ValidateNested()
  images: CreateCarImageDto[];
}
