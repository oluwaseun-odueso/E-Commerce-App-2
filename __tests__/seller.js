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

describe('POST /seller/login', () => {
    test('Login request with successful details', async() => {
        const response = await request(app)
        .post('/seller/login')
        .send({
            email: "sunkanmi@gmail.com",
            password: "sunkanmi"
        })
        expect(response.body.message).toBe("You have successfully logged in")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })

    test('Login request with a non-existent email', async() => {
        const response = await request(app)
        .post('/seller/login')
        .send({
            email: "sunkanmi3@gmail.com",
            password: "sunkanmi"
        })
        expect(response.body.message).toBe("Email does not exist")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Login request with a wrong password', async() => {
        const response = await request(app)
        .post('/seller/login')
        .send({
            email: "sunkanmi@gmail.com",
            password: "sunkanmi3"
        })
        expect(response.body.message).toBe("You have entered an incorrect password")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Login request with empty fields', async() => {
        const response = await request(app)
        .post('/seller/login')
        .send({})        
        expect(response.body.message).toBe("Please enter all necessary fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})

describe('PUT /seller/update_account', () => {
    test('Update request with valid details', async() => {
        const response = await request(app)
        .put('/seller/update_account')
        .set('Authorization', `Bearer ${token}`)
        .send({
            firstName: "Olasunkanmi", 
            lastName: "Abimbola", 
            email: "sunkanmi@gmail.com", 
            store_id: 10, 
            phone_number: "09057839212", 
            address: "13, Adedayo Street"
        })        
        expect(response.body.message).toBe("Account details updated")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(200);
    })

    test('Update request with already existing email', async() => {
        const response = await request(app)
        .put('/seller/update_account')
        .set('Authorization', `Bearer ${token}`)
        .send({
            firstName: "Olasunkanmi", 
            lastName: "Abimbola", 
            email: "tambo@gmail.com", 
            store_id: 10, 
            phone_number: "09057839212", 
            address: "13, Adedayo Street"
        })        
        expect(response.body.message).toBe("Email already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Update request with already existing phone number', async() => {
        const response = await request(app)
        .put('/seller/update_account')
        .set('Authorization', `Bearer ${token}`)
        .send({
            firstName: "Olasunkanmi", 
            lastName: "Abimbola", 
            email: "sunkanmi@gmail.com", 
            store_id: 10, 
            phone_number: "08053355222", 
            address: "13, Adedayo Street"
        })        
        expect(response.body.message).toBe("Phone number already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })

    test('Login request with empty fields', async() => {
        const response = await request(app)
        .put('/seller/update_account')
        .set('Authorization', `Bearer ${token}`)
        .send({})        
        expect(response.body.message).toBe("Please enter all fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})