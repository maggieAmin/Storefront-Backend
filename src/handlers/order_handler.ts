import { OrderStore } from '../models/order';
import express, { Request, Response } from 'express';
import { OrderProductStore } from '../models/orderProduct';
import { verifyToken } from '../helpers/jwt-helper';

const orderStore = new OrderStore();
const orderProductStore = new OrderProductStore();

type ProductQuantity = {
  product_id: number;
  quantity: number;
};

type FullOrder = {
  id: number;
  user_id: number;
  orderProducts: ProductQuantity[];
  statusOfOrder: string;
};

const userOrders = async (req: Request, res: Response) => {
  try {
    if (!verifyToken(req.body.token)) {
      res.status(401);
      res.json('JWT Token missing');
      return;
    }
    const reqUserId = parseInt(req.params.user_id);
    console.log('Request orders for user:', reqUserId);
    const allOrrders = await orderStore.index();
    const userOrder = allOrrders.filter((order) => order.user_id === reqUserId);
    console.log('Found these orders for user:', JSON.stringify(userOrder));
    const outputOrders: FullOrder[] = [];
    for (const order of userOrder) {
      const orderId = order.id ?? 0;
      const productOrdersDB = await orderProductStore.show(orderId);
      const productOrders: ProductQuantity[] = productOrdersDB.map(
        (productOrder) => {
          return {
            product_id: productOrder.product_id,
            quantity: productOrder.quantity,
          };
        }
      );
      outputOrders.push({
        id: orderId,
        user_id: order.user_id,
        orderProducts: productOrders,
        statusOfOrder: order.status_of_order,
      });
    }
    res.json(outputOrders);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:user_id', userOrders);
};

export default orderRoutes;
