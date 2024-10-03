import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { ssrPrepass } from '@trpc/next/ssrPrepass'
// import superjson from 'superjson'
import type { AppRouter } from '@/server/routers'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  config(opts) {
    const { ctx } = opts
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        // transformer: superjson,
        links: [
          httpBatchLink({
            url: '/api/trpc',
            // transformer: superjson,
          }),
        ],
      }
    }

    return {
      // transformer: superjson,
      links: [
        httpBatchLink({
          // The server needs to know your app's full url
          url: `${getBaseUrl()}/api/trpc`,
          *headers() {
            if (!ctx?.req?.headers) {
              return {}
            }
            return {
              cookie: ctx.req.headers.cookie,
            }
          },
          // transformer: superjson,
        }),
      ],
    }
  },
})

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

export * from './schema'
