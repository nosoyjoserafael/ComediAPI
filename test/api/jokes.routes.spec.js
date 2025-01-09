import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js';
import { text } from 'express';

// Prueba unitaria para la API de chistes
// Pasos para ejecutar la prueba a través de la terminal:
// 1. Instalar las dependencias: npm install
// 2. Ejecutar la prueba: npm test

describe('Pruebas sobre la API de chistes', () => {

    describe('GET /comediAPI/joke', () => {
        it('Debería devolver un chiste de Chuck Norris', async () => {
            const response = await request(app).get('/comediAPI/joke?type=Chuck');

            expect(response.status).to.equal(200);
        });
        it('Debería devolver un chiste de papá', async () => {
            const response = await request(app).get('/comediAPI/joke?type=Dad%20Joke');

            expect(response.status).to.equal(200);
        });
        it('Debería devolver un chiste propio', async () => {
            const response = await request(app).get('/comediAPI/joke?type=Propio');

            if (response.status === 200) {
                expect(response.status).to.equal(200);
            } else if (response.status === 404) {
                expect(response.status).to.equal(404);
                expect(response.body.message).to.equal('Aún no hay chistes, cree uno!');
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        });
    });

});

describe('POST /comediAPI/joke', () => {
    it('Debería crear un nuevo chiste', async () => {
        const newJoke = {
            text: 'wenamichoinasama',
            author: '',
            rating: 5,
            category: 'Propio'
        };

        const response = await request(app)
            .post('/comediAPI/joke')
            .send(newJoke);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
    });
});

describe('DELETE /comediAPI/joke/:id', () => {
    it('Debería eliminar un chiste', async () => {

        //Primero creamos un chiste generico propio para poder eliminarlo
        const newJoke = {
            text: 'wenamichoinasama',
            author: '',
            rating: 5,
            category: 'Propio'
        };

        const responsePost = await request(app)
            .post('/comediAPI/joke')
            .send(newJoke);

        //Obtenemos el id del chiste creado y lo eliminamos
        const id = responsePost.body.id;
        const responseDelete = await request(app).delete(`/comediAPI/joke/${id}`);
        expect(responseDelete.status).to.equal(200);
    });
});

describe('PUT /comediAPI/joke/:id', () => {
    it('Debería modificar un chiste', async () => {

        //Primero creamos un chiste generico para luego eliminarlo
        const newJoke = {
            text: 'wenamichoinasama',
            author: '',
            rating: 5,
            category: 'Propio'
        };

        const responsePost = await request(app)
            .post('/comediAPI/joke')
            .send(newJoke);

        //Obtenemos el id del chiste creado y lo eliminamos
        const id = responsePost.body.id;

        //Modificamos el chiste anterior
        const modifiedJoke = {
            text: 'wenamichoinasama',
            author: 'Matias',
            rating: 5,
            category: 'Propio'
        };
        const responsePut = await request(app).put(`/comediAPI/joke/${id}`).send(modifiedJoke);
        expect(responsePut.status).to.equal(200);
    });
});

describe('GET /comediAPI/joke/:id', () => {
    it('Debería conseguir un chiste por su id', async () => {

        //Primero creamos un chiste generico para luego buscarlo
        const newJoke = {
            text: 'wenamichoinasama',
            author: '',
            rating: 5,
            category: 'Propio'
        };

        const responsePost = await request(app)
            .post('/comediAPI/joke')
            .send(newJoke);

        //Obtenemos el id del chiste creado y lo eliminamos
        const id = responsePost.body.id;
        
        const responseGetByID = await request(app).get(`/comediAPI/joke/${id}`)
        expect(responseGetByID.status).to.equal(200);
    });
});

describe('GET /comediAPI/joke/count', () => {
    it('Debería devolver la cantidad de chistes por categoría', async () => {
        const response = await request(app).get('/comediAPI/joke/count?category=Propio');

        if (response.status === 200) {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('count');
        } else if (response.status === 404) {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('No hay chistes en esta categoría');
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    });
});

describe('GET /comediAPI/joke/rating', () => {
    it('Debería devolver todos los chistes por puntaje', async () => {
        const response = await request(app).get('/comediAPI/joke/rating?rating=5');

        if (response.status === 200) {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        } else if (response.status === 404) {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('No hay chistes con este puntaje');
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    });
});

