import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from './authContext'
// import superjson from 'superjson'

const t = initTRPC.context<Context>().create()
// {transformer: superjson}

export const router = t.router
export const procedure = t.procedure
export const middleware = t.middleware

export const isAuth = middleware(async (opts) => {
  const { ctx } = opts
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  })
})

//middleware for isAdmin
// export const isAdmin = middleware(async (opts) => {
//   const { ctx } = opts
//   if (!ctx.user.admin) {
//     throw new TRPCError({ code: 'UNAUTHORIZED' })
//   }
//   return opts.next({
//     ctx: {
//       user: ctx.user.admin,
//     },
//   })
// })
