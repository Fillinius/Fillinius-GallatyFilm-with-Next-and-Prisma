import { router } from '../trpc'
import { filmRouter } from './film'

export const appRouter = router({
  film: filmRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
