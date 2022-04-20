import { OrderStore } from '../../src/models/order';
import { UserStore } from '../../src/models/user';

const store = new OrderStore();
const userStore = new UserStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should eturn a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a order', async () => {
    let user = await userStore.create({
        id:1,
        firstname: "Maggie",
        lastname: "Amin",
        password: "D440AED189A13FF970DAC7E7E8F987B2"
    });
    const result = await store.create({
      id: 1,
      user_id: 1,
      status_of_order: "ACTIVE",
    });
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status_of_order: "ACTIVE",
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1 ,
      user_id: 1,
      status_of_order: "ACTIVE" ,
    }]);
 });

 it('show method should return the correct order', async () => {
  const result = await store.show("1");
  expect(result).toEqual({
    id: 1,
    user_id: 1,
    status_of_order: "ACTIVE" ,
    });
  });

  it('delete method should remove the order', async () => {
    await store.delete(1);
    const result = await store.index()

    expect(result).toEqual([]);
    await userStore.delete(1)
  });
});