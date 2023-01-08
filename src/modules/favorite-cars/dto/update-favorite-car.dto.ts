import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteCarDto } from './create-favorite-car.dto';

export class UpdateFavoriteCarDto extends PartialType(CreateFavoriteCarDto) {}
