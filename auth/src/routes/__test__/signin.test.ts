import request from 'supertest';
import { app } from "../../app";

it('fails when a email that does exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
   await request(app)
       .post('/api/users/signup')
       .send({
           email: "test@test.com",
           password: "password"
       })
       .expect(201);
   await request(app)
       .post('/api/users/signin')
       .send({
           email: "test@test.com",
           password: "incorrect"
       })
       .expect(400)
});

it("Responds with 200 when valid credentials entered", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
});

it("Responds with a cookie when valid credentials entered", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
    expect(response.get("Set-Cookie")).toBeDefined();
});