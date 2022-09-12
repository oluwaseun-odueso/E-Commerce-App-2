const request = require('supertest')
const app = require('../app')

describe("POST /users/signup", () => {
    test('Successful sign up, 201 status code when all fields are present', async() => {
        const response = await request(app).post('/user/signup').send({
            first_name: "Tomi",
            last_name: "Ade", 
            email: "tomi@gmail.com", 
            phone_number: "08052748510", 
            password: "tomi", 
            address: "27, Dayo Shittu Street", 
            state: "Lagos", 
            postal_code: "100273"
        })
        expect(response.body.message).toBe("Your account has been created")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(201)
    })
    test('sign up with an existing email', async() => {
        const response = await request(app).post('/user/signup').send({
            first_name: "Tomi",
            last_name: "Ade", 
            email: "tomi@gmail.com", 
            phone_number: "08052748520", 
            password: "tomi", 
            address: "27, Dayo Shittu Street", 
            state: "Lagos", 
            postal_code: "100273"
        })
        expect(response.body.message).toBe("Email already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400)
    })
    test('sign up with an existing phone number', async() => {
        const response = await request(app).post('/user/signup').send({
            first_name: "Tomi",
            last_name: "Ade", 
            email: "tomi3@gmail.com", 
            phone_number: "08052748510", 
            password: "tomi", 
            address: "27, Dayo Shittu Street", 
            state: "Lagos", 
            postal_code: "100273"
        })
        expect(response.body.message).toBe("Phone number already exists")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400)
    })
    test('When all fields are missing', async () => {
        const response = await request(app).post('/user/signup').send({})        
        expect(response.body.message).toBe("Please enter all fields")
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.statusCode).toBe(400);
    })
})
