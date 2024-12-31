import { Router } from "express"
import { getJoke, createJoke, deleteJoke } from "../controllers/jokeController.js"

const router = Router(); // Crea un objeto router

// Rutas

router.get('/joke', getJoke);
router.post('/joke', createJoke);
router.delete('/joke/:id', deleteJoke);

export default router;