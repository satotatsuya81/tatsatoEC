import { CreateOrderItemDto } from '../../order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  userId: number;
  totalAmount: number;
  status: string;
  orderItems: CreateOrderItemDto[];
}
