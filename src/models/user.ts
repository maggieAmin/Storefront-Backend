// @ts-ignore
import Client from '../database';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can not get users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(b: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      let sql, params;
      if (b.id) {
        sql =
          'INSERT INTO users (id, firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *';
        params = [b.id, b.firstname, b.lastname, b.password];
      } else {
        sql =
          'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
        params = [b.firstname, b.lastname, b.password];
      }
      const result = await conn.query(sql, params);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`);
    }
  }

  async update(b: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET id=$1, firstName="$2", lastName="$3", password="$4" WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        b.id,
        b.firstname,
        b.lastname,
        b.password,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
