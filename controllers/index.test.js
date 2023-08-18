/* eslint-disable no-undef */
const { userLogin, startDB, closetDB } = require('.');


describe('Component test', () => {
    beforeAll(async () => {
        await startDB();
    }
    );

    afterAll(() => {
        closetDB();
    })

    test('login with all correct information', async () => {
        const employeeData = {
            "password": "password123",
            "email": "test11@aol.com"
        };
        const result = await userLogin(employeeData);
        expect(result).toBe({
            "code": "200",
            "message": "Login Successful"
        
        })
    });

});

