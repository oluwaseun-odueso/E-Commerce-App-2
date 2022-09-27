const request = require('supertest');
const { response } = require('../app');
const app = require('../app')

let token ;

beforeAll(async () => {
    const response = await request(app).post('/user/login')
    .send({
        email: 'topeolaiya@gmail.com',
        password: "topeolaiya"
      })
    token = response.body.token;
  });

describe('POST /payment/pay_for_order', () => {
    test('Pay for an order', async() => {
        const response = await request(app)
        .post('/payment/pay_for_order')
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("Kindly pay through the link below")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(201);
    })
    test("When user doesn't have an order to pay for", async() => {
        const response = await request(app)
        .post('/payment/pay_for_order')
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("Create an order to make payment")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})

describe('GET /payment/view_payment/4', () => {
    test('View payment', async() => {
        const response = await request(app)
        .get(`/payment/view_payment/${4}`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("Order payment details")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })
    test('No payment made for an order', async() => {
        const response = await request(app)
        .get(`/payment/view_payment/${4}`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).not.toBe("No payment made for an order")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })
})