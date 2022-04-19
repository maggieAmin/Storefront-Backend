// @ts-ignore
import Client from '../database';

export type OrderProduct = {
  id?: number;
  name: string;
  price: number;
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

  async show(id: string): Promise<OrderProduct> {
    try {
      const sql = 'SELECT * FROM orderProducts WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find orderProduct ${id}. Error: ${err}`);
    }
  }

  async create(b: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO orderProducts (name, price) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [b.name, b.price]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(`Could not add new orderProduct ${name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<OrderProduct> {
    try {
      const sql = 'DELETE FROM orderProducts WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(`Could not delete orderProduct ${id}. Error: ${err}`);
    }
  }
}
