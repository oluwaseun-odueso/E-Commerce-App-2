const request = require('supertest')
const app = require('../app')

describe('POST /seller/signup', () => {
    test('Sign up request with valid details', async() => {
        const response = await request(app)
        .post('/seller/signup')
        .send({
            firstName: "Olasunkanmi", 
            lastName: "Abimbola", 
            email: "sunkanmi@gmail.com", 
            password: "sunkanmi", 
            store_id: 10, 
            phone_number: "09057839212", 
            address: "13, Adedayo Street"
        })        
        expect(response.body.message).toBe("Seller account created")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(201);
    })

    test('Sign up request with existing email', async() => {
        const response = await request(app)
        .post('/seller/signUp')
        .send({
            firstName: "Olasunkanmi", 
            lastName: "Abimbola", 
            email: "sunkanmi@gmail.com", 
            password: "sunkanmi", 
            store_id: 10, 
            phone_number: "09057839211", 
            address: "13, Adedayo Street"
        })        
        expect(response.body.message).toBe("Email already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Sign up request with existing phone number', async() => {
        const response = await request(app)
        .post('/seller/signUp')
        .send({
            firstName: "Olasunkanmi", 
            lastName: "Abimbola", 
            email: "sunkanmi1@gmail.com", 
            password: "sunkanmi1", 
            store_id: 10, 
            phone_number: "09057839212", 
            address: "13, Adedayo Street"
        })        
        expect(response.body.message).toBe("Phone number already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Sign up request with empty fields', async() => {
        const response = await request(app)
        .post('/seller/signUp')
        .send({})        
        expect(response.body.message).toBe("Please enter all necessary fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})
