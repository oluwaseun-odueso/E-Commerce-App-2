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

describe('GET /store/create_store', () => {
    test('Successfully add store', async() => {
        const response = await request(app)
        .post('/store/create_store')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Jumpsuit store", 
            address: "Block A. Balogun Market, Lagos, Island, Lagos"
        })
        expect(response.body.message).toBe("Store created")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(201);
    })

    test('When seller already has a store', async() => {
        const response = await request(app)
        .post('/store/create_store')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Jumpsuit store", 
            address: "Block A. Balogun Market, Lagos, Island, Lagos"
        })
        expect(response.body.message).toBe("Cannot create store, you already have a store")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('When store name already exists', async() => {
        const response = await request(app)
        .post('/store/create_store')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Jumpsuit store", 
            address: "Block A. Balogun Market, Lagos, Island, Lagos"
        })
        expect(response.body.message).toBe("Shop already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('create store with empty fields', async() => {
        const response = await request(app)
        .post('/store/create_store')
        .set('Authorization', `Bearer ${token}`)
        .send({})        
        expect(response.body.message).toBe("Please enter all fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})
