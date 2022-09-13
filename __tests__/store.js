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

describe('POST /store/create_store', () => {
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
            name: "Tambo Wristwatches and Clocks", 
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

describe('PUT /store/update_store_details/:id', () => {
    test('Update store with valid details', async() => {
        const response = await request(app)
        .put(`/store/update_store_details/${6}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Jumpsuit store2", 
            address: "Block A. Balogun Market, Lagos, Island, Lagos"
        })        
        expect(response.body.message).toBe("Store updated")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })

    test('Update store that does not exist', async() => {
        const response = await request(app)
        .put(`/store/update_store_details/${10}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Jumpsuit store2", 
            address: "Block A. Balogun Market, Lagos, Island, Lagos"
        })        
        expect(response.body.message).toBe("Store does not exist")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Update store with already existing name', async() => {
        const response = await request(app)
        .put(`/store/update_store_details/${6}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Tambo Wristwatches and Clocks", 
            address: "Block A. Balogun Market, Lagos, Island, Lagos"
        })        
        expect(response.body.message).toBe("Store name already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Update store with empty fields', async() => {
        const response = await request(app)
        .put(`/store/update_store_details/${6}`)
        .set('Authorization', `Bearer ${token}`)
        .send({})        
        expect(response.body.message).toBe("Please enter all fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})
  
describe('GET /store/get_account/:id', () => {
    test('Get a seller', async () => {
        const response = await request(app)
        .get(`/store/get_store/${6}`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).not.toBe("Store does not exist")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })
})

describe('DELETE /store/close_store/:id', () => {
    test('Successfully close a store', async () => {
        const response = await request(app)
        .delete(`/store/close_store/${6}`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("Store closed")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })

    test('Successfully close a store', async () => {
        const response = await request(app)
        .delete(`/store/close_store/${6}`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.body.message).toBe("Store does not exist")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})