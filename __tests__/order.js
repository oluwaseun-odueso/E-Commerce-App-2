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
            product_ids: [1, 2, 8], 
            product_quantities: [1, 2, 2]
        })        
        expect(response.body.message).toBe("Order created")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(201);
    })

    test('Creating order when user already has an order', async() => {
        const response = await request(app)
        .post('/order/add_order')
        .set('Authorization', `Bearer ${token}`)
        .send({
            product_ids: [1, 2, 8], 
            product_quantities: [1, 2, 2]
        })        
        expect(response.body.message).toBe("Pay for or delete previous order to create a new one")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test.only('When user adds non-existing product to order', async() => {
        const response = await request(app)
        .post('/order/add_order')
        .set('Authorization', `Bearer ${token}`)
        .send({
            product_ids: [55, 2, 8], 
            product_quantities: [1, 2, 2]
        })        
        expect(response.body.message).toBe("Product with id 55 does not exist")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test.only('When user order quantity for product exceeds quantity in stock', async() => {
        const response = await request(app)
        .post('/order/add_order')
        .set('Authorization', `Bearer ${token}`)
        .send({
            product_ids: [1, 2, 8], 
            product_quantities: [1, 2, 401]
        })     
        expect(response.body.message).toBe("Tampon order quantity higher than quantity in stock")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test.only('When user sends an empty order request', async() => {
        const response = await request(app)
        .post('/order/add_order')
        .set('Authorization', `Bearer ${token}`)
        .send({})        
        expect(response.body.message).toBe("Please enter all fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})

describe('GET /order/get_order', () => {
    test("Get user's order", async() => {
        const response = await request(app)
        .get('/order/get_order')
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("Your order")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })

    test("Get user's order", async() => {
        const response = await request(app)
        .get('/order/get_order')
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).not.toBe("You don't have an order")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })
})

describe('DELETE /order/delete_order', () => {
    test('When user has no order', async() => {
        const response = await request(app)
        .delete('/order/delete_order')
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("You don't have an order")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('When user has an order', async() => {
        const response = await request(app)
        .delete('/order/delete_order')
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).not.toBe("Your order has been deleted")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})
