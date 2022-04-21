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
            "firstname": "John",
            "lastname": "Matta",
            "password": "password456"
        });
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual("John");
        expect(response.body.lastname).toEqual("Matta");
        expect(response.body.password).not.toEqual("password456");
        await userStore.delete(response.body.id);
        done();
    });

    it('should SHOW user with id', async(done) => {
        const user = await userStore.create ({
            id:20,
            firstname: "John",
            lastname: "Matta",
            password: "$2b$06$2kD8iAFGxI.pM544Jb9CfOesjz.BIdq8DFHW2.Xy6obgVuax6.rSu"
        })
        const response = await request.get('/users/20');
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual("John");
        expect(response.body.lastname).toEqual("Matta");
        expect(response.body.password).toEqual("$2b$06$2kD8iAFGxI.pM544Jb9CfOesjz.BIdq8DFHW2.Xy6obgVuax6.rSu");
        await userStore.delete(20);
        done();
    });
});