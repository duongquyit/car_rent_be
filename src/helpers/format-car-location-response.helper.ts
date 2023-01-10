import { CarLocation } from 'src/modules/car-locations/entities/car-location.entity';

export const formatCarLocationResponseHelper = (carLocation: CarLocation[]) => {
  return carLocation.map((item) => ({
    id: item.id,
    car_id: item.car_id,
    city_id: item.city_id,
    name: item.city.name,
  }));
};
