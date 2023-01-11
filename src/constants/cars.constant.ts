export const LIMIT_DEFAULT = 8;
export const OFFSET_DEFAULT = 0;

export const SELECT_COL_DEFAULT = [
  'cars.id',
  'cars.capacity',
  'cars.gasoline',
  'cars.base_price',
  'cars.price',
  'master_type_translation.id',
  'master_type_translation.name',
  'car_translation.id',
  'car_translation.name',
  'car_translation.steering',
  'car_types.id',
  'car_types.car_id',
  'car_types.type_id',
  'master_type.id',
];

export const SELECT_CAR_IMAGES_COL = ['car_images.path', 'car_images.id'];

export const SELECT_CAR_DESCRIPTION_COL = ['car_translation.description'];

export const CAR_IMAGE_THUMBNAIL_DEFAULT =
  'https://w7.pngwing.com/pngs/414/106/png-transparent-enzo-ferrari-sports-car-luxury-vehicle-ferrari-compact-car-car-performance-car-thumbnail.png';
