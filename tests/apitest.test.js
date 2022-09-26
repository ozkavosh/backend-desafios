import supertest from "supertest";
import {expect} from "chai";
import { producto as generador } from "../utils/crearDatos.js";

const request = supertest('http://localhost:8080');

describe('Test products api', () => {
    describe('GET', () => {
        it('should return all products', async () => {
            let response = await request.get('/productos/api');
            expect(response.status).to.be.eql(200);
            expect(response.body).to.be.instanceOf(Array);
        })
    })

    let id;

    describe('POST', () => {
        it('should add a product to the list', async () => {
            let response = await request.post('/productos/api').send(generador());
            id = response.body.at(-1).id;
            expect(response.status).to.be.eql(200);
            expect(response.body).to.be.instanceOf(Array);
        })
    })

    describe('PUT', () => {
        it('should edit a product from the list', async () => {
            let response = await request.put('/productos/api/'+id).send(generador());
            expect(response.status).to.be.eql(200);
            expect(response.body).to.be.instanceOf(Array);
        })
    })

    describe('DELETE', () => {
        it('should remove a product from the list', async () => {
            let response = await request.delete('/productos/api/'+id);
            expect(response.status).to.be.eql(200);
            expect(response.body).to.be.instanceOf(Object);
        })
    })
})