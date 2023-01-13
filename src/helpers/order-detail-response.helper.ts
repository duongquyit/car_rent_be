export const handleResponseOrderDetail = (orderDetails: any[]) => {
  return orderDetails.map((orderDetail) => ({
    ...orderDetail,
    car: {
      id: orderDetail.car.id,
      capacity: orderDetail.car.capacity,
      image_thumbnail: orderDetail.car.image_thumbnail,
      name: orderDetail.car.car_translation.name,
      car_types: orderDetail.car.car_types.map((type) => ({
        id: type.master_type.id,
        name: type.master_type.master_type_translation.name,
      })),
    },
  }));
};
