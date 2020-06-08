import request from 'supertest';
import { app } from "../../app";

it('returns a 201 on a successful sign up', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
})

it("returns a 400 with an invalid email", async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test",
            password: "password"
        })
        .expect(400);
})

it("returns a 400 when password is too long", async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test",
            password: "passwordivnkjndfkjndkfjn"
        })
        .expect(400);
})

it("returns a 400 when password is too short", async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test",
            password: "pa"
        })
        .expect(400);
})

it("returns a 400 with missing email and password", async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "",
            password: ""
        })
        .expect(400);
})

it("Does not allow duplicate emails", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "testing@test.com",
            password: "password"
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "testing@test.com",
            password: "password"
        })
        .expect(400);
})

it('sets a cookie after succesful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "testing@test.com",
            password: "password"
        })
        .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
})