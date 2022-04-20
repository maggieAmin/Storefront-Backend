// @ts-ignore
import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status_of_order: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can not get orders ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      let sql, params;
      if (b.id) {
        sql =
          'INSERT INTO orders (id, user_id, status_of_order) VALUES($1, $2, $3) RETURNING *';
        params = [b.id, b.user_id, b.status_of_order];
      } else {
        sql =
          'INSERT INTO orders (user_id, status_of_order) VALUES($1, $2) RETURNING *';
        params = [b.user_id, b.status_of_order];
      }
      const result = await conn.query(sql, params);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async update(b: Order): Promise<Order> {
    try {
      const sql =
        'UPDATE orders SET id=$1, user_id="$2", status_of_order=$3 WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        b.id,
        b.user_id,
        b.status_of_order,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
