export const handleResponseOrders = (order: any) => {
  return {
    id: order.id,
    total: order.total,
    order_details: order.order_order_details.map((item) => ({
      ...handleResponseOrderItem(item),
    })),
  };
};

export const formatOrderResponse = (orders) => {
  return orders.map((order: any) => ({
    id: order?.id,
    total: order?.total,
    order_details: order?.order_order_details.map((item) => ({
      ...handleResponseOrderItem(item),
    })),
  }));
};

export const handleResponseOrderItem = (order) => {
  return {
    id: order.id,
    total: order.total,
    pick_up_datetime: order.pick_up_datetime,
    drop_off_datetime: order.drop_off_datetime,
    car_id: order.car.id,
    capacity: order.car.capacity,
    image_thumbnail: order.car.image_thumbnail,
    name: order.car.car_translation.name,
    steering: order.car.car_translation.steering,
    car_types: order.car.car_types.map((type) => ({
      id: type.master_type.id,
      name: type.master_type.master_type_translation.name,
    })),
    pick_up_city: order.pick_up_city.name,
    drop_off_city: order.drop_off_city.name,
    review: order.review,
  };
};
