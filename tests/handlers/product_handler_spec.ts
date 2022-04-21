import supertest from "supertest";
import app from '../../src/index'
import { ProductStore } from "../../src/models/product";

const request = supertest(app);

const productStore = new ProductStore();

describe('Product Handler', () => {
    it('should have an index GET endpoint', async(done) => {
        const response = await request.get('/products/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
        done();
    });
    it('should POST product', async(done) => {
        const response = await request.post('/products/').send({
            "name": "Jeans",
            "price": 50
        });
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("Jeans");
        expect(response.body.price).toEqual("50");
        await productStore.delete(response.body.id);
        done();
    });

    it('should SHOW product with id', async(done) => {
        const product = await productStore.create ({
            id: 5,
            name: 'shoes',
            price: 150
        })
        const response = await request.get('/products/5');
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("shoes");
        expect(response.body.price).toEqual("150");
        await productStore.delete(5);
        done();
    });
});