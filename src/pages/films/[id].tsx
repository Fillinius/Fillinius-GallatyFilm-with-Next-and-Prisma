import { FilmCardDetail } from '@/entities/film/'
import { trpc } from '@/shared/api/api'
import { useRouter } from 'next/router'

export default function Film() {
  const router = useRouter()

  const { data, isLoading } = trpc.film.findById.useQuery({
    id: Number(router.query.id),
  })

  if (isLoading) {
    return 'Loading...'
  }
  if (!data) {
    return 'Data is not found'
  }
  return <FilmCardDetail {...data} />
}
