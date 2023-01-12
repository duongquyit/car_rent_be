import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    // TODO
  }

  findAll() {
    // TODO
  }

  findOne(id: number) {
    // TODO
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    // TODO
  }

  remove(id: number) {
    // TODO
  }
}
