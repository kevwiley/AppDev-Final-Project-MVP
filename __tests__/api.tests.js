const request = require('supertest');
const app = require('../server.js');
const { db } = require('../database/models');

let token;
let partId;
let buildId;
let testEmail;

//Resets DB before tests run
beforeAll(async () => {
    await db.sync({ force: true });
});

describe('API Tests', () => {

    //Authorization tests using post for user resource type
    test('Register User (Success)', async () => {
        testEmail = `test${Date.now()}@test.com`;

        const res = await request(app).post('/api/register').send({
            username: 'newjestuser',
            email: testEmail,
            password: '123456',
            role: 'admin'
        });

        expect(res.statusCode).toBe(201);
    });

    test('Login User (Success)', async () => {
        const res = await request(app).post('/api/login').send({
            email: testEmail,
            password: '123456'
        });

        expect(res.statusCode).toBe(200);
        token = res.body.token;
    });

    //Create tests for parts, and builds resource type
    test('Create Part (Success)', async () => {
        const res = await request(app)
            .post('/api/parts')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test GPU', category: 'GPU', price: 1000 });

        expect(res.statusCode).toBe(201);
        partId = res.body.id;
    });

    test('Create Build (Success)', async () => {
        const res = await request(app)
            .post('/api/builds')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Build' });

        expect(res.statusCode).toBe(201);
        buildId = res.body.id;
    });

    //Get tests for parts and builds, as well as by ids of each
    test('Get Parts (Success)', async () => {
        const res = await request(app).get('/api/parts');
        expect(res.statusCode).toBe(200);
    });

    test('Get Builds (Success)', async () => {
        const res = await request(app).get('/api/builds');
        expect(res.statusCode).toBe(200);
    });

    test('Get Part by ID (Success)', async () => {
        const res = await request(app).get(`/api/parts/${partId}`);
        expect(res.statusCode).toBe(200);
    });

    test('Get Build by ID (Success)', async () => {
        const res = await request(app).get(`/api/builds/${buildId}`);
        expect(res.statusCode).toBe(200);
    });

    //Put request tests 
    test('Update Part (Success)', async () => {
        const res = await request(app)
            .put(`/api/parts/${partId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ price: 900 });

        expect(res.statusCode).toBe(200);
    });

    test('Update Build (Success)', async () => {
        const res = await request(app)
            .put(`/api/builds/${buildId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Build' });

        expect(res.statusCode).toBe(200);
    });

    //Delete request tests
    test('Delete Part (Success)', async () => {
        const res = await request(app)
            .delete(`/api/parts/${partId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    test('Delete Build (Success)', async () => {
        const res = await request(app)
            .delete(`/api/builds/${buildId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    //Failure tests
    test('Create Part (Fail: No Token)', async () => {
        const res = await request(app)
            .post('/api/parts')
            .send({ name: 'Fail GPU' });

        expect(res.statusCode).toBe(401);
    });

    test('Get Part (Fail: Not Found)', async () => {
        const res = await request(app).get('/api/parts/99999');
        expect(res.statusCode).toBe(404);
    });

});