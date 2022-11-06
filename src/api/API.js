import { faker } from "@faker-js/faker";

export default class API {
    static instance = null;

    constructor() {
        if (API.instance !== null)
            throw new Error("API instance is already exists");
        this.users = [];

        const usersQuantity = 100000;

        for (let index = 0; index < usersQuantity; index++) {
            this.users.push(this.#generateUser());            
        }
    };

    static getInstance() {
        return API.instance ?? new API();
    };

    #generateUser() {
        return {
            _id: faker.datatype.uuid(),
            avatar: faker.image.avatar(),
            birthday: faker.date.birthdate(),
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            sex: faker.name.sexType(),
            subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
        };
    };

    async getAllUsers(netWorkError = false) {
        return new Promise((res, rej) => {
            setTimeout(()=>{
                if (netWorkError) rej("Network Error");
                else res(API.getInstance().users);
            }, 2000);
        });
    };

    async getPageUsers(page, userPerPage, netWorkError = false) {
        return new Promise((res, rej) => {
            setTimeout(()=>{
                if (netWorkError) rej("Network Error");
                else {
                    const start = (page-1) * userPerPage;
                    const finish = page * userPerPage;
                    res({
                        total: API.getInstance().users.length,
                        data: API.getInstance().users.slice(start, finish)
                    });
                }
            }, 500);
        });
    }
}