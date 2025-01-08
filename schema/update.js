import z from 'zod'

const updateSchema = z.object(
  {
    texto: z.string(),
    autor: z.string(),
    puntaje: z.number().positive().min(1).max(5),
    categoria: z.enum(["Dad Joke", "Humor negro", "Chistoso", "malo"]),
  }
)

export function validateUpdate(data) {
  return updateSchema.safeParse(data)
}
