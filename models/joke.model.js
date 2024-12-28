import mongoose from "mongoose";
import { Schema } from "mongoose"; // importa Schema desde mongoose

// Crea un nuevo esquema con los campos que tendrá el chiste en la colección de mongo
const jokeSchema = new Schema({
    ID: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Joke", jokeSchema);