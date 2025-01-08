import { Router } from "express"
import { getJoke, createJoke, deleteJoke, updateJoke } from "../controllers/jokeController.js"

const router = Router(); // Crea un objeto router

// Rutas

/**
 * @swagger
 * /joke?type={type}:
 *   get:
 *     summary: Obtiene un chiste
 *     tags: [Jokes]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Chuck, Dad Joke, Propio]
 *         required: true
 *         description: Tipo de chiste a obtener.           
 *     responses:
 *       200:
 *         description: Chiste obtenido exitosamente
 *       400:
 *         description: Parámetro no válido
 */
router.get('/joke', getJoke);

/**
 * @swagger
 * /joke:
 *   post:
 *     summary: Crea un nuevo chiste
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               author:
 *                 type: string
 *               rating:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chiste creado exitosamente
 *       400:
 *         description: Error al crear el chiste
 */
router.post('/joke', createJoke);

/**
 * @swagger
 * /joke/{id}:
 *   delete:
 *     summary: Elimina un chiste por su ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del chiste a eliminar
 *     responses:
 *       200:
 *         description: Chiste eliminado exitosamente
 *       404:
 *         description: Chiste no encontrado
 */
router.delete('/joke/:id', deleteJoke);

router.put('/joke/:id', updateJoke);

export default router;