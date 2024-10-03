import { FilmCard } from '@/entities/film/ui/card'
import { IsLikedBtn } from '@/features/isLikeFilm/ui/isLikedBtn'
import { prisma } from '@/server/db'
import { trpc } from '@/shared/api/api'

export default function Home() {
  const { data, refetch } = trpc.film.findMany.useQuery()

  if (!data) {
    return <div>Loading...</div>
  }
  // console.log(data)

  return (
    <ul>
      {data.map((film) => (
        <li key={film.id}>
          <FilmCard
            {...film}
            isLikedBtn={
              <IsLikedBtn
                filmId={film.id}
                isLiked={film.isLiked}
                onSuccess={refetch}
              />
            }
          />
        </li>
      ))}
    </ul>
  )
}

// eslint-disable-next-line @next/next/no-typos
export const getServersSideProps = async () => {
  const users = await prisma.user.findMany()

  return {
    prop: users,
  }
}
