import { z } from 'zod'

export const CreateFilmsSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  poster: z.string(),
  date: z.coerce.date(),
  isLiked: z.boolean(),
})
