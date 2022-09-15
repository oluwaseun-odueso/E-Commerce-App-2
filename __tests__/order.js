const request = require('supertest')
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

describe('POST /order/add_order', () => {
    test('Successfully add product to order', async() => {
        const response = await request(app)
        .post('/order/add_order')
        .set('Authorization', `Bearer ${token}`)
        .send({
            product_id: 12, 
            quantity: 1
        })        
        expect(response.body.message).toBe("Product added to order")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(201);
    })

    test('Add non-existing product to order', async() => {
        const response = await request(app)
        .post('/order/add_order')
        .set('Authorization', `Bearer ${token}`)
        .send({
            product_id: 20, 
            quantity: 1
        })        
        expect(response.body.message).toBe("Product does not exist")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Empty add product to order request', async() => {
        const response = await request(app)
        .post('/order/add_order')
        .set('Authorization', `Bearer ${token}`)
        .send({})        
        expect(response.body.message).toBe("Please enter all fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})
