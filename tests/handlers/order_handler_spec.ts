import supertest from "supertest";
import { generateToken } from "../../src/helpers/jwt-helper";
import app from '../../src/index'
import { OrderStore } from "../../src/models/order";
import { OrderProductStore } from "../../src/models/orderProduct";
import { ProductStore } from "../../src/models/product";
import { UserStore } from "../../src/models/user";

const request = supertest(app);
const productStore = new ProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();
const orderProductStore = new OrderProductStore();

describe('Order Handler', () => {
    it('create method should get user order', async (done) => {
        const user = await userStore.create({
            id: 8,
            firstname: 'Iron',
            lastname: 'Man',
            password: '$2b$06$2kD8iAFGxI.pM544Jb9CfOesjz.BIdq8DFHW2.Xy6obgVuax6.rSu'
        });

        const order = await orderStore.create({
          id: 7,
          user_id: 8,
          status_of_order: "active"
        });

        const product1 = await productStore.create({
            id: 4,
            name: 'hat',
            price: 15
        })

        const product2 = await productStore.create({
            id: 5,
            name: 'belt',
            price: 20
        })

        const rel1 = await orderProductStore.create({
            order_id: 7,
            product_id: 4,
            quantity: 1
        });

        const rel2 = await orderProductStore.create({
            order_id: 7,
            product_id: 5,
            quantity: 2
        });
        const token = generateToken("20");

        const response = await request.get('/orders/8').send({token:token});
        expect(response.status).toBe(200);
        expect(response.body[0].id).toEqual(7);
        expect(response.body[0].user_id).toEqual(8);
        expect(response.body[0].statusOfOrder).toEqual("active");
        expect(response.body[0].orderProducts.length).toEqual(2);
        expect(response.body[0].orderProducts[0].product_id).toEqual(4);
        expect(response.body[0].orderProducts[0].quantity).toEqual(1);
        expect(response.body[0].orderProducts[1].product_id).toEqual(5);
        expect(response.body[0].orderProducts[1].quantity).toEqual(2);
        await orderProductStore.delete(7,4);
        await orderProductStore.delete(7,5);
        await productStore.delete(4);
        await productStore.delete(5);
        await orderStore.delete(7);
        await userStore.delete(8);
        done();
    });

});