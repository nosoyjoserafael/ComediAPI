import { Router } from "express"
import { getJoke, createJoke } from "../controllers/jokeController.js"

const router = Router(); // Crea un objeto router

// Rutas

router.get('/joke', getJoke);
router.post('/joke', createJoke);

export default router;