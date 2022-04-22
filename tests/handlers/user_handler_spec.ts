import supertest from "supertest";
import { generateToken } from "../../src/helpers/jwt-helper";
import app from '../../src/index'
import { UserStore } from "../../src/models/user";

const request = supertest(app);

const userStore = new UserStore();
const token = generateToken("20");

describe('User Handler', () => {
    it('should have an index GET endpoint', async(done) => {
        const response = await request.get('/users/').send({token: token});
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
        done();
    });
    it('should NOT an index GET endpoint if token missing', async(done) => {
        const response = await request.get('/users/');
        expect(response.status).toBe(401);
        done();
    });
    it('should POST user', async(done) => {
        const response = await request.post('/users/').send({
            "id": 20,
            "firstname": "Captain",
            "lastname": "America",
            "password": "password456",
            "token": token
        });
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual("Captain");
        expect(response.body.lastname).toEqual("America");
        expect(response.body.password).not.toEqual("password456");
        await userStore.delete(response.body.id);
        done();
    });
    it('should NOT POST user if token missing', async(done) => {
        const response = await request.post('/users/').send({
            "id": 20,
            "firstname": "Captain",
            "lastname": "America",
            "password": "password456"
        });
        expect(response.status).toBe(401);
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
        const response = await request.get('/users/20').send({token: token});
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual("Captain");
        expect(response.body.lastname).toEqual("America");
        expect(response.body.password).not.toEqual("password456");
        await userStore.delete(20);
        done();
    });

    it('should NOT SHOW user with id if token is missing', async(done) => {
        const user = await userStore.create ({
            id:20,
            firstname: "Captain",
            lastname: "America",
            password: "password456"
        })
        const response = await request.get('/users/20');
        expect(response.status).toBe(401);
        await userStore.delete(20);
        done();
    });

    it('should login for user with id', async(done) => {
        const user = await userStore.create ({
            id:20,
            firstname: "Captain",
            lastname: "America",
            password: "password456"
        })
        const response = await (await request.post('/users/login').send({
            id:"20",
            password: "password456"
        }));
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual("Captain");
        expect(response.body.lastname).toEqual("America");
        expect(response.body.token).toBeDefined();
        await userStore.delete(20);
        done();
    });

    it('should NOT login for user with id but wrong password', async(done) => {
        const user = await userStore.create ({
            id:20,
            firstname: "Captain",
            lastname: "America",
            password: "password456"
        })
        const response = await (await request.post('/users/login').send({
            id:"20",
            password: "password789"
        }));
        expect(response.status).toBe(401);
        expect(response.body).toEqual("Invalid credentials");
        await userStore.delete(20);
        done();
    });
});