import { CreateFilmForm } from '@/features/create-film'
import { InputsProp } from '@/features/create-film/ui/form'
import { trpc } from '@/shared/api/api'

export default function CreateFilms() {
  const { mutate } = trpc.film.create.useMutation()

  const handlerSubmit = (data: InputsProp) => {
    mutate(data)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <CreateFilmForm onSubmit={handlerSubmit} />
    </div>
  )
}
