import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailsService {
  create(createOrderDetailDto: CreateOrderDetailDto) {
    // TODO
  }

  findAll() {
    // TODO
  }

  findOne(id: number) {
    // TODO
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    // TODO
  }

  remove(id: number) {
    // TODO
  }
}
