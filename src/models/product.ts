// @ts-ignore
import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number | string; // String is used for reading from DB to allow for higher precision
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can not get products ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      let sql, params;
      if (b.id) {
        sql =
          'INSERT INTO products (id, name, price) VALUES($1, $2, $3) RETURNING *';
        params = [b.id, b.name, b.price];
      } else {
        sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
        params = [b.name, b.price];
      }
      const result = await conn.query(sql, params);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`);
    }
  }

  async update(b: Product): Promise<Product> {
    try {
      const sql = 'UPDATE products SET id=$1, name="$2", price=$3 WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [b.id, b.name, b.price]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
