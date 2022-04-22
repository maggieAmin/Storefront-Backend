import supertest from "supertest";
import app from '../../src/index'
import { UserStore } from "../../src/models/user";

const request = supertest(app);

const userStore = new UserStore();

describe('User Handler', () => {
    it('should have an index GET endpoint', async(done) => {
        const response = await request.get('/users/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
        done();
    });
    it('should POST user', async(done) => {
        const response = await request.post('/users/').send({
            "id": 20,
            "firstname": "Captain",
            "lastname": "America",
            "password": "password456"
        });
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual("Captain");
        expect(response.body.lastname).toEqual("America");
        expect(response.body.password).not.toEqual("password456");
        await userStore.delete(response.body.id);
        done();
    });

    it('should SHOW user with id', async(done) => {
        const user = await userStore.create ({
            id:20,
            firstname: "Captain",
            lastname: "America",
            password: "password456"
        })
        const response = await request.get('/users/20');
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual("Captain");
        expect(response.body.lastname).toEqual("America");
        expect(response.body.password).not.toEqual("password456");
        await userStore.delete(20);
        done();
    });
});