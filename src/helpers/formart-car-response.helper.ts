import { CAR_IMAGE_THUMBNAIL_DEFAULT } from 'src/constants/cars.constant';

export const formatCarResponseHelper = (car: any, fields: string[] = []) => {
  return {
    id: car.id,
    capacity: car.capacity,
    gasoline: car.gasoline,
    base_price: car.base_price,
    price: car.price,
    name: car.car_translation?.name,
    ...(fields.includes('description') && {
      description: car.car_translation?.description,
    }),
    image_thumbnail: car.image_thumbnail || CAR_IMAGE_THUMBNAIL_DEFAULT,
    steering: car.car_translation?.steering,
    car_types: car.car_types.map((type: any) => ({
      id: type.master_type?.id,
      name: type.master_type?.master_type_translation?.name,
    })),
  };
};
