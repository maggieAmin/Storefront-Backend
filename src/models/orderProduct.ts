// @ts-ignore
import Client from '../database';

export type OrderProduct = {
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductStore {
  async index(): Promise<OrderProduct[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orderProducts';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can not get orderProducts ${err}`);
    }
  }

  async show(order_id: number): Promise<OrderProduct> {
    try {
      const sql = 'SELECT * FROM orderProducts WHERE order_id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find orderProduct ${order_id}. Error: ${err}`);
    }
  }

  async create(b: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO orderProducts (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        b.order_id,
        b.product_id,
        b.quantity,
      ]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(`Could not add new orderProduct. Error: ${err}`);
    }
  }

  async update(b: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        'UPDATE orderproducts SET order_id=$1, product_id=$2, quantity=$3 WHERE order_id=$1 AND product_id=$2';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        b.order_id,
        b.product_id,
        b.quantity,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(order_id: number, product_id: number): Promise<OrderProduct> {
    try {
      const sql =
        'DELETE FROM orderProducts WHERE order_id=$1 AND product_id=$2';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [order_id, product_id]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(`Could not delete orderProduct. Error: ${err}`);
    }
  }
}
