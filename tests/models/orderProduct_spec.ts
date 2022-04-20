import { OrderStore } from '../../src/models/order';
import { OrderProductStore } from '../../src/models/orderProduct';
import { ProductStore } from '../../src/models/product';
import { UserStore } from '../../src/models/user';

process.env.ENV='test';

const store = new OrderProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();
const productStore = new ProductStore();

describe('OrderProduct Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of orderProducts', async () => {
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

  it('create method should add a orderProduct', async () => {
    const user = await userStore.create({
        id:1,
        firstname: "Maggie",
        lastname: "Amin",
        password: "D440AED189A13FF970DAC7E7E8F987B2"
    });
    const product = await productStore.create({
        id:1,
        name: "dress",
        price:100
    });
    const order = await orderStore.create({
        id:1,
        user_id: 1,
        status_of_order: "ACTIVE",
    });
    const result = await store.create({
      order_id: 1,
      product_id: 1,
      quantity:5
    });
    expect(result).toEqual({
        order_id: 1,
        product_id: 1,
        quantity:5
    });
  });

  it('index method should return a list of orderProducts', async () => {
    const result = await store.index();
    expect(result).toEqual([{
        order_id: 1,
        product_id: 1,
        quantity:5
    }]);
 });

 it('show method should return the correct orderProduct', async () => {
  const result = await store.show(1);
  expect(result).toEqual([{
      order_id: 1,
      product_id: 1,
      quantity:5
    }]);
  });

  it('delete method should remove the orderProduct', async () => {
    await store.delete(1,1);
    const result = await store.index()

    expect(result).toEqual([]);
    await orderStore.delete(1);
    await productStore.delete(1);
    await userStore.delete(1);
  });
});
