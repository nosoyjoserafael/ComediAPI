import { Router } from "express"
import { getJoke } from "../controllers/jokeController.js"

const router = Router(); // Crea un objeto router

// Rutas

router.get('/joke', getJoke);

export default router;