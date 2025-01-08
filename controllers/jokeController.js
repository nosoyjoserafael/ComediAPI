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
                try {
                    const allJokes = await Joke.find();
                    if (allJokes.length === 0) {
                        return res.status(404).json({ message: 'Aún no hay chistes, cree uno!' });
                    }
                    joke = allJokes[Math.floor(Math.random() * allJokes.length)].text;
                } catch (error) {
                    console.error(error);
                }
                break;
            default:
                return res.status(400).send('Error: Parámetro no válido.');
        }
        res.status(200).send(joke);
    } catch (error) {
        res.status(500).send('Error al obtener el chiste.');
    }
};

/**
 * Crea un nuevo chiste.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void}
 * 
 * @description
 * Esta función maneja la solicitud para crear un nuevo chiste.
 * 
 * @example
 * Ejemplo de uso con Postman o herramientas similares:
 * POST http://localhost:3000/api/joke
 * Body: {
 *   "text": "wenamichoinasama",
 *   "author": "",
 *   "rating": 5,
 *   "category": "Propio"
 * }
 */

export const createJoke = async (req, res) => {
    let { text, author, rating, category } = req.body;

    //Verifica que los campos obligatorios no estén vacíos
    if (!text) {
        return res.status(400).json({ message: 'El chiste no puede estar vacío.' });
    }
    if (!rating) {
        return res.status(400).json({ message: 'La calificación no puede estar vacía' });
    }
    if (!category) {
        return res.status(400).json({ message: 'La categoría no puede estar vacía' });
    }

    //Al ser un campo opcional, si el autor está vacío se le asigna un valor por defecto
    if (!author) {
        author = 'Se perdió en el Ávila como Led';
    }

    try {
        const newJoke = new Joke({ text, author, rating, category });
        await newJoke.save();
        res.status(201).json({ id: newJoke.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al guardar el chiste.: ', error });
    }
};

/**
 * Elimina un chiste.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void}
 * 
 * @description
 * Esta función maneja la solicitud para eliminar un chiste.
 * 
 * @example
 * Ejemplo de uso con Postman o herramientas similares:
 * DELETE http://localhost:3000/api/joke/123
 */

export const deleteJoke = async (req, res) => {
    const id = req.params.id;
    try {
        await Joke.findByIdAndDelete(id);
        res.status(200).json({ message: 'Chiste eliminado.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el chiste.: ', error });
    }
};

/**
 * Actualiza un chiste.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void}
 * 
 * @description
 * Esta función maneja la solicitud para actualizar un chiste.
 * 
 * @example
 * Ejemplo de uso con Postman o herramientas similares:
 * PUT http://localhost:3000/api/joke/123
 * Body: {
 *   "text": "wenamichoinasama",
 *   "author": "",
 *   "rating": 5,
 *   "category": "Propio"
 * }
 */
export const updateJoke = async (req, res) => {
    const { id } = req.params;
    const { texto, autor, puntaje, categoria } = req.body;

    try {
        const chisteActualizado = await Joke.findByIdAndUpdate(
            id,
            { texto, autor, puntaje, categoria },
            { new: true, runValidators: true }

        );

        if (!chisteActualizado) {
            return res.status(404).json({ error: 'Chiste no encontrado' });
        }

        res.json(chisteActualizado)
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al actualizar el chiste' });
    }
}