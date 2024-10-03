import { isAuth } from './../trpc'
import { prisma } from '../db'
import { procedure, router } from '../trpc'
import { CreateFilmsSchema } from '@/shared/api/schema'
import { z } from 'zod'

export const filmRouter = router({
  findMany: procedure.query(() => {
    return prisma.film.findMany()
  }),
  create: procedure
    .input(CreateFilmsSchema)
    .use(isAuth)
    .mutation(async ({ input, ctx: { user } }) => {
      return prisma.film.create({
        data: {
          ...input,
          isLiked: false,
          authorId: user.id,
        },
      })
    }),

  isLiked: procedure
    .input(
      z.object({
        id: z.number(),
        isLiked: z.boolean(),
      })
    )
    .use(isAuth)
    .mutation(({ input }) => {
      return prisma.film.update({
        where: {
          id: input.id,
        },
        data: {
          isLiked: !input.isLiked,
        },
      })
    }),

  findById: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.film.findUnique({
        where: input,
        select: {
          title: true,
          poster: true,
          date: true,
          description: true,
          isLiked: true,
          id: true,
        },
      })
    }),
})
