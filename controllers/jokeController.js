import axios from 'axios';
import Joke from "../models/joke.model.js";

// Controlador para manejar los chistes de la API

/**
 * Obtiene un chiste de la API.
 * 
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {void}
 * 
 * @description
 * Esta función maneja la solicitud para obtener un chiste. Dependiendo del parámetro `type` en la consulta,
 * obtiene un chiste de diferentes fuentes:
 * - "Chuck": Obtiene un chiste de la API de Chuck Norris.
 * - "Dad Joke": Obtiene un chiste de la API de Dad Jokes.
 * - "Propio": Obtiene un chiste de la base de datos mongo.
 * 
 * @example
 * // Ejemplo de uso con Postman o herramientas similares:
 * // http://localhost:3000/api/joke?type=Propio
 */

export const getJoke = async (req, res) => {

    const jokeType = req.query.type;

    if (!jokeType) {
        return res.status(400).send('Error: No se recibió ningún parámetro.');
    }

    try {
        let joke;
        switch (jokeType) { // Dependiendo del tipo de chiste, se hace una petición a una API distinta
            case 'Chuck':
                const chuckResponse = await axios.get('https://api.chucknorris.io/jokes/random');
                joke = chuckResponse.data.value;
                break;
            case 'Dad Joke':
                const dadResponse = await axios.get('https://icanhazdadjoke.com/', {
                    headers: { 'Accept': 'application/json' }
                });
                joke = dadResponse.data.joke;
                break;
            case 'Propio': // Si el tipo de chiste es propio, se obtiene un chiste de la base de datos
                try{
                    const allJokes = await Joke.find();
                    joke = allJokes[Math.floor(Math.random() * allJokes.length)].text;
                }catch(error){
                    console.error(error);
                }
                break;
            default:
                return res.status(400).send('Error: Parámetro no válido.');
        }
        res.send(joke);
    } catch (error) {
        res.status(500).send('Error al obtener el chiste.');
    }
};