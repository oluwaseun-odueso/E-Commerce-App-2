const request = require('supertest')
const app = require('../app')

let token ;

beforeAll(async () => {
    const response = await request(app).post('/seller/login')
    .send({
        email: 'sunkanmi@gmail.com',
        password: "sunkanmi"
      })
    token = response.body.token;
  });

describe('POST /product/add_product', () => {
    test('Add product to store with valid details', async() => {
        const response = await request(app)
        .post('/product/add_product')
        .set('Authorization', `Bearer ${token}`)
        .send({
            product_description: "Two-piece Jumpsuit", 
            price: 9000, 
            quantity_in_stock: 50
        })        
        expect(response.body.message).toBe("Product added")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(201);
    })

    test('Add product to store with already existing product name', async() => {
        const response = await request(app)
        .post('/product/add_product')
        .set('Authorization', `Bearer ${token}`)
        .send({
            product_description: "Two-piece Jumpsuit", 
            price: 9000, 
            quantity_in_stock: 50
        })        
        expect(response.body.message).toBe("Product name already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Add product to store with already existing product name', async() => {
        const response = await request(app)
        .post('/product/add_product')
        .set('Authorization', `Bearer ${token}`)
        .send({})        
        expect(response.body.message).toBe("Please enter all fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})

describe('DELETE /product/delete_product/:id', () => {
    test('Successfully delete a product', async () => {
        const response = await request(app)
        .delete(`/product/delete_product/${13}`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("Product deleted")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })

    test.only('Successfully delete a product', async () => {
        const response = await request(app)
        .delete(`/product/delete_product/${13}`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("Product does not exist")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})
  